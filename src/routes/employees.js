const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const ctrl = require("../controllers/employeeController");

// protect all employee routes
router.use(authMiddleware);

// Assignment route FIRST
router.put("/assign", ctrl.assignToTeam);

router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", ctrl.remove);

module.exports = router;


