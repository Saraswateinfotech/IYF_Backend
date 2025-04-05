const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createBatch, getAllBatches, getBatchesByfacilitatorId,updateIsStart } = require("../controllers/batchController");



router.post("/createBatch", authMiddleware, createBatch);
router.get("/allBatches", authMiddleware, getAllBatches);
router.get("/getBatchesByfacilitatorId/:facilitatorId", authMiddleware, getBatchesByfacilitatorId);
router.put('/update-batch-start',authMiddleware, updateIsStart);




module.exports = router;