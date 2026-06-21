const express = require("express");
const router = express.Router();

const vehicleController = require("../controllers/vehicleController");
const authenticate = require("../middlewares/authMiddleware");

// Create Vehicle
router.post(
  "/",
  authenticate,
  vehicleController.createVehicle
);

// Get All Vehicles
router.get(
  "/",
  authenticate,
  vehicleController.getVehicles
);

// Get Vehicle By Id
router.get(
  "/:id",
  authenticate,
  vehicleController.getVehicleById
);

// Update Vehicle
router.put(
  "/:id",
  authenticate,
  vehicleController.updateVehicle
);

// Delete Vehicle
router.delete(
  "/:id",
  authenticate,
  vehicleController.deleteVehicle
);

module.exports = router;