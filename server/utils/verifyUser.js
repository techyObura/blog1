import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

/* export const verifyUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return next(errorHandler(401, "Invalid authorization header"));

  const token = authHeader.split(" ")[1];

    const token = req.cookies.jwt; 

  if (!token) {
    console.log("Request Cookies:", req.cookies);
    return next(errorHandler(400, "Unauthorized level 1"));
  }

  jwt.verify(token, process.env.jwt_secret_key, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized level 2"));
    }

    req.user = user;

    next();
  });
}; */

export const verifyUser = (req, res, next) => {
  const token = req.header("jwt");

  // if have, then allow. If don't have, then don't allow
  if (!token) return res.status(401).json({ message: "Accessed denied!" });

  try {
    // verify the exist token
    const verified = jwt.verify(token, process.env.jwt_secret_key);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token!" });
  }
};

/* 
function verifyAccessToken(token) {
  const secret = process.env.jwt_secret_key;

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
 */
