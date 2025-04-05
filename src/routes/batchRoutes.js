const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createBatch, getAllBatches, getBatchesByfacilitatorId , attendanceSession } = require("../controllers/batchController");



router.post("/createBatch", authMiddleware, createBatch);
router.get("/allBatches", authMiddleware, getAllBatches);
router.get("/getBatchesByfacilitatorId/:facilitatorId", authMiddleware, getBatchesByfacilitatorId);
router.post("/studentAttendance", authMiddleware, attendanceSession);




module.exports = router;