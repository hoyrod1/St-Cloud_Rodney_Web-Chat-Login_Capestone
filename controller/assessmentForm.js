const AssessmentForm = require("../model/AssessmentForm");

module.exports = {
  createAssessment,
  getAssessments,
  getAssessment,
  updateAssessment,
  deleteAssessment,
};
//======================================================================//

//======================================================================//
// Create Assessment
async function createAssessment(req, res) {
  try {
    const createTrainingPackage = await AssessmentForm.create(req.body);

    res.status(200).json(createTrainingPackage);
  } catch (err) {
    res.status(400).json("Error: The training package was not created");
  }
}
//======================================================================//

//======================================================================//
// Get all Assessment
async function getAssessments(req, res) {
  try {
    const trainingPackages = await AssessmentForm.find({});

    res.status(200).json(trainingPackages);
  } catch (err) {
    res.status(400).json("Error: was not able to retrieve all the Assessments");
  }
}
//======================================================================//

//======================================================================//
// Get a single Assessment
async function getAssessment(req, res) {
  try {
    const singleTrainingPackage = await AssessmentForm.findById(req.params.id);

    res.status(200).json(singleTrainingPackage);
  } catch (err) {
    res.status(400).json("Error: was not able to retrieve the Assessment");
  }
}
//======================================================================//

//======================================================================//
// Update a single Assessment
async function updateAssessment(req, res) {
  try {
    const updatedTrainingPackage = await AssessmentForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedTrainingPackage);
  } catch (err) {
    res.status(400).json("Error: was not able to update the Assessment");
  }
}
//======================================================================//

//======================================================================//
// Delete a single Assessment
async function deleteAssessment(req, res) {
  try {
    const deleteTrainingPackage = await AssessmentForm.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json(deleteTrainingPackage);
  } catch (err) {
    res.status(400).json("Error: was not able to delete the Assessment");
  }
}
//======================================================================//
