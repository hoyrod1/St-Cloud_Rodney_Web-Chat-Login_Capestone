const { Schema, model } = require("../config/db-connect");

const trainingPackageSchema = Schema({
  type: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

trainingPackageSchema.index({ type: 1 });

module.exports = model("TrainingPackage", trainingPackageSchema);
