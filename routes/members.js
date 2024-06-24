const { Router } = require("express");
const memberCtrl = require("../controller/members.js");

const router = Router();

router.post("/", memberCtrl.createMember);

router.get("/", memberCtrl.getMembers);

router.get("/:id", memberCtrl.getMember);

router.put("/:id", memberCtrl.updateMember);

router.delete("/:id", memberCtrl.deleteMember);

module.exports = router;
