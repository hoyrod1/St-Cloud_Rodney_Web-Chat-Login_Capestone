const { Router } = require("express");
const trainerCtrl = require("../controller/trainer");

const router = Router();

router.post("/", trainerCtrl.createTrainer);

router.get("/", trainerCtrl.getTrainers);

router.get("/:id", trainerCtrl.getTrainer);

router.put("/:id", trainerCtrl.updateTrainer);

router.delete("/:id", trainerCtrl.deleteTrainer);

module.exports = router;
