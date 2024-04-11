import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../modules/user.module.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this user"));
  }

  if (req.body.password) {
    /* if (req.body.password.length < 6) {
      return next(
        errorHandler(400, "Password too short! At least 6 characters required.")
      );
    } */

    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    /* if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Make username length between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    } */

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updateUser._doc;
    res
      .status(200)
      .header("Access-Control-Expose-Headers", "auth-token")
      .json(rest);
  } catch (error) {
    next(error);
  }
};
