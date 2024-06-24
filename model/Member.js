const { Schema, model } = require("../config/db-connect");

const memberSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
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

memberSchema.index({ email: 1 });

module.exports = model("Member", memberSchema);
