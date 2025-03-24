const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { saveStudentData, getAllStudents, updateStudentById} = require("../controllers/studentFormController");



router.post("/save", authMiddleware, saveStudentData);
router.get("/allStudents", authMiddleware, getAllStudents);
router.put("/allStudent/id/:user_id", authMiddleware,updateStudentById);



module.exports = router;