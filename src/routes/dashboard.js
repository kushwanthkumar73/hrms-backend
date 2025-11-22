const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

router.get("/", authMiddleware, dashboardController.stats);

module.exports = router;
