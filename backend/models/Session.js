const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true 
    },

    role: { 
      type: String, 
      required: true,
      trim: true
    },

    experienceLevel: { 
      type: String, 
      required: true,
      enum: ["Fresher", "Junior", "Mid", "Senior"]   // optional but recommended
    },

    topicsToFocusOn: { 
      type: [String], 
      required: true 
    },

    description: { 
      type: String,
      default: ""
    },

    questions: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Question" 
      }
    ],
  },
  { timestamps: true }   // createdAt & updatedAt auto add ho jayega
);

module.exports = mongoose.model("Session", sessionSchema);
