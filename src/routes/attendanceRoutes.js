const express = require("express");
const { markAttendance, getStudentGroupWise, updateStudentGroupWise } = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();



router.post('/markAttendance',authMiddleware, markAttendance);
router.post('/updateStudentGroupWise', authMiddleware, updateStudentGroupWise);
router.post('/getStudentGroupWise', authMiddleware, getStudentGroupWise);


module.exports = router;