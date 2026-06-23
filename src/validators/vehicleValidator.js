const { body } = require("express-validator");

const vehicleValidator = [
  body("vehicleNumber")
    .notEmpty()
    .withMessage("Vehicle number is required"),

  body("ownerName")
    .notEmpty()
    .withMessage("Owner name is required"),

  body("vehicleType")
    .isIn(["bike", "car", "truck"])
    .withMessage(
      "Vehicle type must be bike, car, or truck"
    ),
];

module.exports = {
  vehicleValidator,
};