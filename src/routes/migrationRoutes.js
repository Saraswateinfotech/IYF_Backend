const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addMigration } = require("../controllers/migrationController");
const router = express.Router();



router.post('/migrate', authMiddleware,addMigration);

module.exports = router;
