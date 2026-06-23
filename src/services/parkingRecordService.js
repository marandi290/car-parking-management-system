const ParkingRecord = require("../models/ParkingRecord");
const ParkingSlot = require("../models/ParkingSlot");
const Vehicle = require("../models/Vehicle");
const calculateFee = require("../utils/feeCalculator");

const parkVehicle = async (vehicleId) => {
    // Check if vehicle is already parked
    const existingRecord =
    await ParkingRecord.findOne({
      where: {
        vehicleId,
        status: "active",
      },
    });

    if (existingRecord) {
      throw new Error(
        "Vehicle is already parked"
      );
    }
  // Check vehicle exists
  const vehicle = await Vehicle.findByPk(vehicleId);

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  // Find available slot
  const slot = await ParkingSlot.findOne({
    where: {
      status: "available",
    },
  });

  if (!slot) {
    throw new Error("No parking slots available");
  }

  // Create parking record
  const record = await ParkingRecord.create({
    vehicleId,
    slotId: slot.id,
    entryTime: new Date(),
  });

  // Mark slot occupied
  await slot.update({
    status: "occupied",
  });

  return record;
};

const vehicleExit = async (vehicleId) => {
  const record = await ParkingRecord.findOne({
    where: {
      vehicleId,
      status: "active",
    },
  });

  if (!record) {
    throw new Error("Active parking record not found");
  }

  const vehicle = await Vehicle.findByPk(vehicleId);

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  const exitTime = new Date();

  const result = calculateFee(vehicle.type, record.entryTime, exitTime);

  await record.update({
    exitTime,
    fee: result.totalFee,
    status: "completed",
  });

  const slot = await ParkingSlot.findByPk(
    record.slotId
  );

  if (slot) {
    await slot.update({
      status: "available",
    });
  }

  return record;
};

module.exports = {
  parkVehicle,
  vehicleExit,
};