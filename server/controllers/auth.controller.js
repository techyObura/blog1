import { response } from "express";
import User from "../modules/user.module.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
