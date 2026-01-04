import { registerUser, loginUser } from "../services/auth.service.js";

const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const data = await loginUser(req.body);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export { register, login };
