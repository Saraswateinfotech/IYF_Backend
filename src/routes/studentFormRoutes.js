const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { saveStudentData, getAllStudents, updateStudentById, getUsersByFrontlinerId, updateCallingId, getUserByCallingId, updateStudentStatus, updatePaymentStatusByUserId} = require("../controllers/studentFormController");



router.post("/save", authMiddleware, saveStudentData);
router.get("/allStudents", authMiddleware, getAllStudents);
router.put("/allStudent/id/:user_id", authMiddleware,updateStudentById);
router.post("/frontliner/id", authMiddleware, getUsersByFrontlinerId);
router.post('/update-calling-id', authMiddleware,updateCallingId);
router.get('/user-by-calling-id/:calling_id', authMiddleware,getUserByCallingId);
router.post('/update-student-status',authMiddleware, updateStudentStatus);
router.post('/update-payment-status',authMiddleware, updatePaymentStatusByUserId);





module.exports = router;