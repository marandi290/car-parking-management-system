const ParkingRecord = require("../models/ParkingRecord");
const ParkingSlot = require("../models/ParkingSlot");
const Vehicle = require("../models/Vehicle");

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

  const exitTime = new Date();

  const hours = Math.ceil(
    (exitTime - record.entryTime) /
      (1000 * 60 * 60)
  );

  const fee = hours * 20;

  await record.update({
    exitTime,
    fee,
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