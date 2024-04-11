import User from "../modules/user.module.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(500, "All fields required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  newUser
    .save()
    .then((user) => {
      res.json(`${user.username} has signed up successfully`);
    })
    .catch((err) => {
      next(err);
    });
};

export const signIn = async (req, res, next) => {
  const { password, email } = req.body;

  if (!email || !password || password === "" || email === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.jwt_secret_key,
      {
        expiresIn: "2d",
      }
    );

    const tokenOptions = {
      expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "None",
      secure: true,
    };

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("jwt", token, tokenOptions)
      .header("Access-Control-Expose-Headers", "jwt")
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.jwt_secret_key,
        { expiresIn: "2h" }
      );

      const { password, ...rest } = user._doc;
      const tokenOptions = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };
      res
        .status(200)
        .cookie("jwt", token, tokenOptions)
        .header("Access-Control-Expose-Headers", "jwt")
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.jwt_secret_key, {
        expiresIn: "2h",
      });
      const { password, ...rest } = newUser._doc;
      const tokenOptions = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "None",
        secure: true,
      };
      res
        .status(200)
        .cookie("jwt", token, tokenOptions)
        .header("Access-Control-Expose-Headers", "jwt")
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
