const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ParkingRecord = sequelize.define(
  "ParkingRecord",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    
    slotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    entryTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    exitTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    fee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    status: {
      type: DataTypes.ENUM(
        "active",
        "completed"
      ),
      defaultValue: "active",
    },
  },
  {
    tableName: "parking_records",
    timestamps: true,
  }
);

module.exports = ParkingRecord;