import mongoose from "mongoose";

const userSkillStateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  skillKey: {
    type: String,
    required: true
  },
  mastery: {
    type: Number,
    default: 0
  },
  masteryHistory: [
  {
    mastery: Number,
    date: { type: Date, default: Date.now }
  }
]
, 
  attempts: {
    type: Number,
    default: 0
  },
  avgTime: {
    type: Number,
    default: 0
  },
  mistakes: {
    type: Map,
    of: Number,
    default: {}
  }
});

userSkillStateSchema.index({ userId: 1, skillKey: 1 }, { unique: true });

const UserSkillState = mongoose.model("UserSkillState", userSkillStateSchema);
export default UserSkillState;
