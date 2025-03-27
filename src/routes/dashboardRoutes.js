const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getDashboardReport, getFrontlinerdetailReport } = require("../controllers/dashboardController");



router.get('/dashboard-report',authMiddleware, getDashboardReport);
router.get('/frontliner-report/:callingId',authMiddleware, getFrontlinerdetailReport);


module.exports = router;