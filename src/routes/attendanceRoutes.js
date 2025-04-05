const express = require("express");
const { attendanceSession, markAttendance } = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();



router.post('/markAttendance',authMiddleware, markAttendance);


module.exports = router;