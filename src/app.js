const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const parkingSlotRoutes = require("./routes/parkingSlotRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const parkingRecordRoutes =
  require("./routes/parkingRecordRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Car Parking Management System API",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/slots", parkingSlotRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/parking", parkingRecordRoutes);

module.exports = app;