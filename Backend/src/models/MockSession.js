const mongoose = require("mongoose");

const mockSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  problems: [
    {
      problemId: String,
      skillKey: String,
      difficulty: String
    }
  ],
  submissions: [
    {
      problemId: String,
      correct: Boolean,
      timeTaken: Number
    }
  ],
  startedAt: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number, // seconds
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("MockSession", mockSessionSchema);
