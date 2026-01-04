import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
  problemId: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  skillKey: {
    type: String,
    required: true
  },
  difficulty: {
    type: Number, // 1 (easy) → 5 (hard)
    required: true
  },
  estimatedTime: {
    type: Number // seconds
  }
});

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
