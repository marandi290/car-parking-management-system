const ParkingRecordService = require(
  "../services/parkingRecordService"
);

const vehicleEntry = async (req, res) => {
  try {
    const { vehicleId } = req.body;

    const record =
      await ParkingRecordService.parkVehicle(
        vehicleId
      );

    return res.status(201).json({
      success: true,
      message: "Vehicle parked successfully",
      data: record,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const vehicleExit = async (req, res) => {
  try {
    const { vehicleId } = req.body;

    const record =
      await ParkingRecordService.vehicleExit(
        vehicleId
      );

    return res.status(200).json({
      success: true,
      message:
        "Vehicle exited successfully",
      data: record,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  vehicleEntry,
  vehicleExit,
};