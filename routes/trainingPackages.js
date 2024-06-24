const { Router } = require("express");
const trainingPackageCtrl = require("../controller/trainingPackage");

const router = Router();

router.post("/", trainingPackageCtrl.createTrainingPackage);

router.get("/", trainingPackageCtrl.getTrainingPackages);

router.get("/:id", trainingPackageCtrl.getTrainingPackage);

router.put("/:id", trainingPackageCtrl.updateTrainingPackage);

router.delete("/:id", trainingPackageCtrl.deleteTrainingPackage);

module.exports = router;
