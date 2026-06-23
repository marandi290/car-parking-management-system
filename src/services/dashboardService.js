const ParkingSlot = require("../models/ParkingSlot");
const Vehicle = require("../models/Vehicle");
const ParkingRecord = require("../models/ParkingRecord");
const { Op, fn, col } = require("sequelize");

const getDashboardStats = async () => {
  const totalSlots = await ParkingSlot.count();

  const availableSlots = await ParkingSlot.count({
      where: {
        status: "available",
      },
    });

  const occupiedSlots = await ParkingSlot.count({
      where: {
        status: "occupied",
      },
    });

  const totalVehicles = await Vehicle.count();

  const activeParking = await ParkingRecord.count({
      where: {
        status: "active",
      },
    });

  return {
    totalSlots,
    availableSlots,
    occupiedSlots,
    totalVehicles,
    activeParking,
  };
};

const getTotalRevenue = async () => {
  const result = await ParkingRecord.findOne({
    attributes: [
      [fn("SUM", col("fee")), "totalRevenue"],
    ],
    where: {
      status: "completed",
    },
    raw: true,
  });

  return {
    totalRevenue:
      Number(result.totalRevenue) || 0,
  };
};

const getActiveVehicles = async () => {
  return ParkingRecord.findAll({
    where: {
      status: "active",
    },

    include: [
      {
        model: Vehicle,
        as: "vehicle",
        attributes: [
          "id",
          "vehicleNumber",
          "ownerName",
          "vehicleType",
        ],
      },

      {
        model: ParkingSlot,
        as: "parkingSlot",
        attributes: [
          "id",
          "slotNumber",
          "slotType",
          "status",
        ],
      },
    ],
  });
};

const getParkingHistory = async () => {
  return ParkingRecord.findAll({
    where: {
      status: "completed",
    },

    include: [
      {
        model: Vehicle,
        as: "vehicle",
        attributes: [
          "vehicleNumber",
          "ownerName",
          "vehicleType",
        ],
      },

      {
        model: ParkingSlot,
        as: "parkingSlot",
        attributes: [
          "slotNumber",
          "slotType",
        ],
      },
    ],

    order: [["createdAt", "DESC"]],
  });
};

module.exports = {
  getDashboardStats,
  getTotalRevenue,
  getActiveVehicles,
  getParkingHistory,
};