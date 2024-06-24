const { Schema, model } = require("../config/db-connect");

const assessmentForm = Schema({
  goals: {
    type: String,
    required: true,
  },
  currentBodyWeight: {
    type: String,
    required: true,
    min: 2,
    max: 16,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

assessmentForm.index({ goals: 1 });
module.exports = model("AssessmentForm", assessmentForm);
