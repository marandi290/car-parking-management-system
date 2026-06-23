const { body } = require("express-validator");

const parkingSlotValidator = [
  body("slotNumber")
    .notEmpty()
    .withMessage("Slot number is required"),

  body("slotType")
    .isIn(["bike", "car", "truck"])
    .withMessage(
      "Slot type must be bike, car, or truck"
    ),

  body("status")
    .optional()
    .isIn([
      "available",
      "occupied",
      "reserved",
    ])
    .withMessage(
      "Status must be available, occupied, or reserved"
    ),
];

module.exports = {
  parkingSlotValidator,
};