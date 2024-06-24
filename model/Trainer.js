const { Schema, model } = require("../config/db-connect");

const trainerSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

trainerSchema.index({ name: 1 });
trainerSchema.index({ username: 1 });
trainerSchema.index({ email: 1 });

module.exports = model("Trainer", trainerSchema);
