import express from "express";
import Collaboration from "../models/Collaboration.js";

const router = express.Router();

// GET all active public broadcasts
router.get("/active-broadcasts", async (req, res) => {
  try {
    const broadcasts = await Collaboration.find({ isPublic: true })
      .sort({ createdAt: -1 });
    res.json(broadcasts);
  } catch (error) {
    console.error("Failed to fetch broadcasts", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
