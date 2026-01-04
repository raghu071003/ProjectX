import { hash, compare } from "bcryptjs";
import  User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import initializeUserSkills from "./skillInit.service.js";

const registerUser = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const hashedPassword = await hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });
   await initializeUserSkills(user._id);

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

export { registerUser, loginUser };
