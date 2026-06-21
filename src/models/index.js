const User = require("./User");
const Vehicle = require("./Vehicle");
const ParkingSlot = require("./ParkingSlot");
const ParkingRecord = require("./ParkingRecord");

Vehicle.hasMany(ParkingRecord, {
  foreignKey: "vehicleId",
});

ParkingRecord.belongsTo(Vehicle, {
  foreignKey: "vehicleId",
});

ParkingSlot.hasMany(ParkingRecord, {
  foreignKey: "slotId",
});

ParkingRecord.belongsTo(ParkingSlot, {
  foreignKey: "slotId",
});

module.exports = {
  User,
  Vehicle,
  ParkingSlot,
  ParkingRecord,
};