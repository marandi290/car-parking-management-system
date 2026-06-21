const Vehicle = require("../models/Vehicle");

const createVehicle = async (vehicleData) => {
  return Vehicle.create(vehicleData);
};

const getAllVehicles = async () => {
  return Vehicle.findAll();
};

const getVehicleById = async (id) => {
  return Vehicle.findByPk(id);
};

const updateVehicle = async (id, updateData) => {
  const [updatedCount] = await Vehicle.update(
    updateData,
    {
      where: { id },
    }
  );

  if (!updatedCount) {
    return null;
  }

  return Vehicle.findByPk(id);
};

const deleteVehicle = async (id) => {
  const vehicle = await Vehicle.findByPk(id);

  if (!vehicle) {
    return null;
  }

  await vehicle.destroy();

  return true;
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};