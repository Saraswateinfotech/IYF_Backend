const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getDashboardReport, getFrontlinerdetailReport, getTop3FrontlinersByMonthYear, getAllFrontlinerReports } = require("../controllers/dashboardController");



router.get('/dashboard-report',authMiddleware, getDashboardReport);
router.get('/frontliner-report/:callingId',authMiddleware, getFrontlinerdetailReport);

router.get('/top-3-frontliners/:month/:year', authMiddleware, getTop3FrontlinersByMonthYear);
router.get('/frontliners',authMiddleware, getAllFrontlinerReports);

module.exports = router;