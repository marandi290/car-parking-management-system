const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ParkingSlot = sequelize.define(
  "ParkingSlot",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    slotNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    slotType: {
      type: DataTypes.ENUM(
        "bike",
        "car",
        "truck"
      ),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "available",
        "occupied",
        "reserved"
      ),
      defaultValue: "available",
    },
  },
  {
    tableName: "parking_slots",
    timestamps: true,
  }
);

module.exports = ParkingSlot;