const ParkingRecord = require("../models/ParkingRecord");
const ParkingSlot = require("../models/ParkingSlot");
const Vehicle = require("../models/Vehicle");

const parkVehicle = async (vehicleId) => {
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

module.exports = {
  parkVehicle,
};