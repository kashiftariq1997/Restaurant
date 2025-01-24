import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (_id, phone) => {
  const token = jwt.sign({ _id, phone }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export const signup = async (req, res) => {
  const { name, phone, email, password } = req.body;

  if (!name || (!phone && !email)) {
    return res
      .status(400)
      .json({ message: "Name and either phone or email are required!" });
  }

  try {
    // Check for existing users with the same phone or email
    const existingUser = await User.findOne({
      $or: [{ phone }, { email }],
    });

    if (existingUser) {
      if (existingUser.phone === phone) {
        return res
          .status(409)
          .json({ message: "User with this phone number already exists!" });
      }
      if (existingUser.email === email) {
        return res
          .status(409)
          .json({ message: "User with this email already exists!" });
      }
    }

    // Create new user
    const user = new User({
      name,
      phone: phone || null,
      email: email || null,
      password, // Ensure password is hashed before saving
    });

    await user.save();

    const { password: _, ...rest } = user._doc; // Exclude password from response
    res.status(201).json({
      message: "User created successfully!",
      data: rest,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user!", error });
  }
};


export const signin = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier) {
    return res.status(400).json({ message: "Email or phone is required!" });
  }

  try {
    const query = {};
    if (/\S+@\S+\.\S+/.test(identifier)) {
      query.email = identifier; // If identifier is an email
    } else {
      query.phone = identifier; // If identifier is a phone number
    }

    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (password) {
      if (password !== user.password) {
        return res.status(400).json({ message: "Invalid credentials!" });
      }
    }

    const token = createToken(user._id, user.phone);
    const { password: _, ...rest } = user._doc;

    res.json({
      message: "User signed in successfully!",
      data: rest,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error during sign-in!", error });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select({
    _id: 1,
    name: 1,
    email: 1,
    isAdmin: 1,
    createdAt: 1,
  });
  if (!users) return res.status(404).json({ message: "No users found!" });
  res.status(200).json({ users });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;
  await User.findByIdAndUpdate({ _id: id }, { isAdmin }).select({
    password: 0,
  });
  const user = await User.findOne({ _id: id });
  if (!user) return res.status(404).json({ message: "User not found!" });
  res.json({
    message: "User updated successfully!",
    data: user,
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  if (!user) return res.status(404).json({ message: "User not found!" });
  await User.findByIdAndDelete({ _id: id });
  res.json({ message: "User deleted successfully!" });
};
