const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const {registerValidator, loginValidator} = require("../validators/authValidator");

const validate = require("../middlewares/validationMiddleware");

router.post(
  "/register",
  registerValidator,
  validate,
  authController.register
);

router.post(
  "/login",
  loginValidator,
  validate,
  authController.login
);

module.exports = router;