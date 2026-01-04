import e from "express";
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    skillKey: {
      type: String,
      required: true
    },
    problemId: {
      type: String,
      required: true
    },
    correct: {
      type: Boolean,
      required: true
    },
    timeTaken: {
      type: Number, // seconds
      required: true
    },
    mistakes: {
      type: [String],
      default: []
    },
    complexity: {
      type: String // e.g. O(n), O(n log n)
    }
  },
  { timestamps: true }
);

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
