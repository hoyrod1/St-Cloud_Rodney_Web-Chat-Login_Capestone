const { Router } = require("express");
const assessmentFormCtrl = require("../controller/assessmentForm");

const router = Router();

router.post("/", assessmentFormCtrl.createAssessment);

router.get("/", assessmentFormCtrl.getAssessments);

router.get("/:id", assessmentFormCtrl.getAssessment);

router.put("/:id", assessmentFormCtrl.updateAssessment);

router.delete("/:id", assessmentFormCtrl.deleteAssessment);

module.exports = router;
