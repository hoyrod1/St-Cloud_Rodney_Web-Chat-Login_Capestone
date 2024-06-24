const Member = require("../model/Member.js");

module.exports = {
  createMember,
  getMembers,
  getMember,
  updateMember,
  deleteMember,
};
//======================================================================//

//======================================================================//
async function createMember(req, res) {
  try {
    const createMember = await Member.create(req.body);

    res.status(200).json(createMember);
  } catch (err) {
    res.status(400).json("Error: The member was not created");
  }
}
//======================================================================//

//======================================================================//
// Get all members
async function getMembers(req, res) {
  try {
    const members = await Member.find({});

    res.status(200).json(members);
  } catch (err) {
    res.status(400).json("Error: was not able to retrieve the members");
  }
}
//======================================================================//

//======================================================================//
// Get a single member
async function getMember(req, res) {
  try {
    const singleMember = await Member.findById(req.params.id);

    res.status(200).json(singleMember);
  } catch (err) {
    res.status(400).json("Error: was not able to retrieve a single member");
  }
}
//======================================================================//

//======================================================================//
// Update a single member
async function updateMember(req, res) {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedMember);
  } catch (err) {
    res.status(400).json("Error: was not able to update member");
  }
}
//======================================================================//

//======================================================================//
// Delete a single member
async function deleteMember(req, res) {
  try {
    const deleteMember = await Member.findByIdAndDelete(req.params.id);

    res.status(200).json(deleteMember);
  } catch (err) {
    res.status(400).json("Error: was not able to delete member");
  }
}
//======================================================================//

//======================================================================//
