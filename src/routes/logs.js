const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const logController = require("../controllers/logController");

router.get("/", authMiddleware, logController.list);

module.exports = router;


