const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { saveStudentData, getAllStudents, updateStudentById, getUsersByFrontlinerId, updateCallingId, getUserByCallingId, updateStudentStatus, updatePaymentStatusByUserId, allFacilitatorOrFrontliner, frontlinerStudentByIdOfcallingId,getUsersByBatchId, getUserById, getGroupUserCount} = require("../controllers/studentFormController");



router.post("/save", authMiddleware, saveStudentData);
router.get("/allStudents", authMiddleware, getAllStudents);
router.put("/updateStudentById/id/:user_id", authMiddleware,updateStudentById);
router.post("/frontliner/id", authMiddleware, getUsersByFrontlinerId);
router.post('/update-calling-id', authMiddleware,updateCallingId);
router.get('/user-by-calling-id/:calling_id', authMiddleware,getUserByCallingId);
router.get('/frontlinerStudentByIdOfcallingId/:frontliner_id', authMiddleware,frontlinerStudentByIdOfcallingId);
router.post('/update-student-status',authMiddleware, updateStudentStatus);
router.post('/update-payment-status',authMiddleware, updatePaymentStatusByUserId);
router.get("/allFacilitatorOrFrontliner", authMiddleware, allFacilitatorOrFrontliner);
router.get('/batch/:batch_id', authMiddleware,getUsersByBatchId);
router.post('/getGroupUserCount',authMiddleware, getGroupUserCount);
router.get('/getStudent/:user_id', authMiddleware,getUserById);






module.exports = router;