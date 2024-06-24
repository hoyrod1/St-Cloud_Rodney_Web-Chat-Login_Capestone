const TrainingPackage = require("../model/TrainingPackage");

module.exports = {
  createTrainingPackage,
  getTrainingPackages,
  getTrainingPackage,
  updateTrainingPackage,
  deleteTrainingPackage,
};
//======================================================================//

//======================================================================//
// Create Training Package
async function createTrainingPackage(req, res) {
  try {
    const createTrainingPackage = await TrainingPackage.create(req.body);

    res.status(200).json(createTrainingPackage);
  } catch (err) {
    res.status(400).json("Error: The training package was not created");
  }
}
//======================================================================//

//======================================================================//
// Get all Training Packages
async function getTrainingPackages(req, res) {
  try {
    const trainingPackages = await TrainingPackage.find({});

    res.status(200).json(trainingPackages);
  } catch (err) {
    res
      .status(400)
      .json("Error: was not able to retrieve the training packages");
  }
}
//======================================================================//

//======================================================================//
// Get a single Training Package
async function getTrainingPackage(req, res) {
  try {
    const singleTrainingPackage = await TrainingPackage.findById(req.params.id);

    res.status(200).json(singleTrainingPackage);
  } catch (err) {
    res.status(400).json("Error: was not able to retrieve a training package");
  }
}
//======================================================================//

//======================================================================//
// Update a single Training Package
async function updateTrainingPackage(req, res) {
  try {
    const updatedTrainingPackage = await TrainingPackage.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedTrainingPackage);
  } catch (err) {
    res.status(400).json("Error: was not able to update training package");
  }
}
//======================================================================//

//======================================================================//
// Delete a single Training Package
async function deleteTrainingPackage(req, res) {
  try {
    const deleteTrainingPackage = await TrainingPackage.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json(deleteTrainingPackage);
  } catch (err) {
    res.status(400).json("Error: was not able to delete training package");
  }
}
//======================================================================//

//======================================================================//
