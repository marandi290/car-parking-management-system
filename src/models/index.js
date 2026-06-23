const sequelize = require("../config/database");

const User = require("./User");
const Vehicle = require("./Vehicle");
const ParkingSlot = require("./ParkingSlot");
const ParkingRecord = require("./ParkingRecord");

Vehicle.hasMany(ParkingRecord, {
  foreignKey: "vehicleId",
  as: "parkingRecords",
});

ParkingRecord.belongsTo(Vehicle, {
  foreignKey: "vehicleId",
  as: "vehicle",
});

ParkingSlot.hasMany(ParkingRecord, {
  foreignKey: "slotId",
  as: "parkingRecords",
});

ParkingRecord.belongsTo(ParkingSlot, {
  foreignKey: "slotId",
  as: "parkingSlot",
});

module.exports = {
  sequelize,
  User,
  Vehicle,
  ParkingSlot,
  ParkingRecord,
};