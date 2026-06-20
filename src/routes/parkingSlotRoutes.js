const express = require('express');
const router = express.Router();
const parkingSlotController = require('../controllers/parkingSlotController');
const authenticate =
  require("../middlewares/authMiddleware");

const authorize =
  require("../middlewares/roleMiddleware");

router.post(
  "/",
  authenticate,
  authorize("admin"),
  parkingSlotController.createParkingSlot
);

router.get('/', parkingSlotController.getParkingSlots);
router.get('/available', parkingSlotController.getAvailableSlots);
router.get('/:id', parkingSlotController.getParkingSlotById);
router.put('/:id', parkingSlotController.updateParkingSlot);
router.delete('/:id', parkingSlotController.deleteParkingSlot);

module.exports = router;
