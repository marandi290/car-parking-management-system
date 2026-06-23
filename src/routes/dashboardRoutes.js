const express = require("express");

const router = express.Router();

const authenticate = require("../middlewares/authMiddleware");

const dashboardController = require("../controllers/dashboardController");

router.get(
  "/stats",
  authenticate,
  dashboardController.getDashboardStats
);

router.get(
  "/revenue",
  authenticate,
  dashboardController.getTotalRevenue
);

router.get(
  "/active-vehicles",
  authenticate,
  dashboardController.getActiveVehicles
);

router.get(
  "/history",
  authenticate,
  dashboardController.getParkingHistory
);

module.exports = router;