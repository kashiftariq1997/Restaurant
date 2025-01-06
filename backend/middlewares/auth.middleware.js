import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers || {};
  if (!authorization || authorization.split(" ")[0] !== "Bearer") {
    return res
      .status(401)
      .json({ error: "You must be logged in to access this route." });
  }
  const token = authorization.split(" ")[1];
  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error("JWT Secret is not set!");
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    console.log("authorized");
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token." });
  }
};
