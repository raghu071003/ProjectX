import mongoose from "mongoose";

const skillNodeSchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  baseDifficulty: {
    type: Number,
    required: true
  },
  prerequisites: {
    type: [String],
    default: []
  }
});

const SkillNode = mongoose.model("SkillNode", skillNodeSchema);

export default SkillNode;
