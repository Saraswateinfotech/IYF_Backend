const express = require("express");
const { signUp, login, getDashboard, deleteDashboard,   } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/getDashboard",authMiddleware, getDashboard);
router.delete("/deleteDashboard/:user_id",authMiddleware, deleteDashboard);

module.exports = router;
