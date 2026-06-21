const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vehicle = sequelize.define(
  "Vehicle",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    vehicleNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    ownerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    vehicleType: {
      type: DataTypes.ENUM(
        "bike",
        "car",
        "truck"
      ),
      allowNull: false,
    },
  },
  {
    tableName: "vehicles",
    timestamps: true,
  }
);

module.exports = Vehicle;