const VehicleService = require("../services/vehicleService");

const createVehicle = async (req, res) => {
  try {
    const vehicle = await VehicleService.createVehicle(req.body);

    return res.status(201).json({
      status: true,
      data: vehicle
    });
  } catch (error) {
    return res.status(500).json({
        status: false,
      message: error.message,
    });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await VehicleService.getAllVehicles();

    return res.status(200).json({
      status: true,
      data: vehicles
    });
  } catch (error) {
    return res.status(500).json({
        status: false,
      message: error.message,
    });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicle = await VehicleService.getVehicleById(
      req.params.id
    );

    if (!vehicle) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: vehicle
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await VehicleService.updateVehicle(
      req.params.id,
      req.body
    );

    if (!vehicle) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
      status: true,
      data: vehicle
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const deleted = await VehicleService.deleteVehicle(
      req.params.id
    );

    if (!deleted) {
      return res.status(404).json({
        status: false,
        message: "Vehicle not found",
      });
    }

    return res.status(200).json({
    status: true,
    message: "Vehicle deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};