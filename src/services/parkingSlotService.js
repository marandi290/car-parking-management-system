const ParkingSlot = require("../models/ParkingSlot");

const createParkingSlot = async (slotData) => {
  return ParkingSlot.create(slotData);
};

const getAllParkingSlots = async () => {
  return ParkingSlot.findAll();
};

const getParkingSlotById = async (id) => {
  return ParkingSlot.findByPk(id);
};

const updateParkingSlot = async (id, updateData) => {
  const [updatedCount] = await ParkingSlot.update(
    updateData,
    {
      where: { id },
    }
  );

  if (!updatedCount) {
    return null;
  }

  return ParkingSlot.findByPk(id);
};

const deleteParkingSlot = async (id) => {
  const slot = await ParkingSlot.findByPk(id);

  if (!slot) {
    return null;
  }

  await slot.destroy();

  return true;
};

const findAvailableSlots = async () => {
  return ParkingSlot.findAll({
    where: {
      status: "available",
    },
  });
};

module.exports = {
  createParkingSlot,
  getAllParkingSlots,
  getParkingSlotById,
  updateParkingSlot,
  deleteParkingSlot,
  findAvailableSlots,
};