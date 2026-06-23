const express = require("express");
const router = express.Router();

const parkingSlotController = require("../controllers/parkingSlotController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const {parkingSlotValidator} = require("../validators/parkingSlotValidator");
const validate = require("../middlewares/validationMiddleware");

router.get(
  "/",
  authenticate,
  parkingSlotController.getParkingSlots
);

router.get(
  "/available",
  authenticate,
  parkingSlotController.getAvailableSlots
);

router.get(
  "/:id",
  authenticate,
  parkingSlotController.getParkingSlotById
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  parkingSlotValidator,
  validate,
  parkingSlotController.createParkingSlot
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  parkingSlotValidator,
  validate,
  parkingSlotController.updateParkingSlot
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  parkingSlotController.deleteParkingSlot
);

module.exports = router;