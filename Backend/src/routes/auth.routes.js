import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import initializeUserSkills from "../services/skillInit.service.js";

const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/register", register);
router.post("/login", login);

router.post("/google", async (req, res) => {
  const { token } = req.body;
  console.log("Received Google Auth request");

  try {
    if (!token) {
      console.error("No token provided in request");
      return res.status(400).json({ message: "No token provided" });
    }
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        googleId,
        avatar: picture,
        provider: "google" // Indicates they signed up with Google
      });
      // Initialize default skills for new users
      await initializeUserSkills(user._id);
    } else if (!user.googleId) {
      // If user exists but hasn't linked Google account, link it
      user.googleId = googleId;
      user.avatar = user.avatar || picture;
      user.provider = "google";
      await user.save();
    }

    // Generate standard tokens used by our app
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ user, accessToken, refreshToken });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

export default router;
