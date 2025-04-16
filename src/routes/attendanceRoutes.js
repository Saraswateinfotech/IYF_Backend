const express = require("express");
const { markAttendance, updateStudentGroupWise, getFrontlinerdetailReport, getStudentClassReport, getStudentReport } = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();



router.post('/markAttendance',authMiddleware, markAttendance);
router.post('/updateStudentGroupWise', authMiddleware, updateStudentGroupWise);
router.post('/getFrontlinerdetailReport', authMiddleware, getFrontlinerdetailReport);
router.post('/getStudentClassReport', authMiddleware, getStudentClassReport);
router.post('/getStudentReport', authMiddleware, getStudentReport);


module.exports = router;