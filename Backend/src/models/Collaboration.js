import mongoose from "mongoose";
const collaborationSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  problemId: {
    type: String,
    required: true
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  message: {
    type: String,
    default: ""
  },
  problemName: {
    type: String,
    default: ""
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  senderId: {
    type: String, // Storing socket id of the transmitter
    default: ""
  },
  code: {
    type: String,
    default: ""
  },
  language: {
    type: String,
    default: "javascript"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Collabs", collaborationSchema);