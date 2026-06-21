const express = require("express");
const router = express.Router();

const authenticate = require(
  "../middlewares/authMiddleware"
);

const parkingRecordController =
  require("../controllers/parkingRecordController");

router.post(
  "/entry",
  authenticate,
  parkingRecordController.vehicleEntry
);
router.post(
  "/exit",
  authenticate,
  parkingRecordController.vehicleExit
);

module.exports = router;