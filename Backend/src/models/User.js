const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for OAuth
    googleId: { type: String, unique: true, sparse: true },
    avatar: { type: String },
    provider: { type: String, default: "local" },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    refreshToken: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
