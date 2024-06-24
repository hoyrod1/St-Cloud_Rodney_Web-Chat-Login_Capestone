const Trainer = require("../model/Trainer");

module.exports = {
  createTrainer,
  getTrainers,
  getTrainer,
  updateTrainer,
  deleteTrainer,
};
//======================================================================//

//======================================================================//
// Create Trainer
async function createTrainer(req, res) {
  try {
    const createTrainer = await Trainer.create(req.body);

    res.status(200).json(createTrainer);
  } catch (err) {
    res.status(400).json("Error: The Trainer was not created");
  }
}
//======================================================================//

//======================================================================//
// Get all Trainers
async function getTrainers(req, res) {
  try {
    const trainers = await Trainer.find({});

    res.status(200).json(trainers);
  } catch (err) {
    res.status(400).json("Error: was not able to retrieve all the Trainers");
  }
}
//======================================================================//

//======================================================================//
// Get a single Trainer
async function getTrainer(req, res) {
  try {
    const singleTrainer = await Trainer.findById(req.params.id);

    res.status(200).json(singleTrainer);
  } catch (err) {
    res.status(400).json("Error: was not able to retrieve the Trainer");
  }
}
//======================================================================//

//======================================================================//
// Update a single Trainer
async function updateTrainer(req, res) {
  try {
    const updatedTrainer = await Trainer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedTrainer);
  } catch (err) {
    res.status(400).json("Error: was not able to update Trainer");
  }
}
//======================================================================//

//======================================================================//
// Delete a single Trainer
async function deleteTrainer(req, res) {
  try {
    const deleteTrainer = await Trainer.findByIdAndDelete(req.params.id);

    res.status(200).json(deleteTrainer);
  } catch (err) {
    res.status(400).json("Error: was not able to delete Trainer");
  }
}
//======================================================================//

//======================================================================//
