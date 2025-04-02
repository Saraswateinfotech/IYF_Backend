const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createBatch } = require("../controllers/batchController");



router.post("/createBatch", authMiddleware, createBatch);



module.exports = router;