import mongoose from "mongoose";
const testCaseSchema = new mongoose.Schema({
  input: String,
  expectedOutput: String,
  isHidden: {
    type: Boolean,
    default: false
  }
});

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
  },
   starterCode: {
    javascript: String
  },
  testCases: [testCaseSchema]
});

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;
