import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
const router = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
router.post("/register", register);
router.post("/login", login);
router.post("/google", async (req, res) => {
  const { token } = req.body; // Google ID token

  try {
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
        provider: "google"
      });
    }

    // Issue your own JWT
    const appToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token: appToken });
  } catch (err) {
    res.status(401).json({ error: "Invalid Google token" });
  }
});

export default router;
