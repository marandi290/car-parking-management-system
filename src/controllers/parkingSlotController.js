const ParkingSlotService = require('../services/parkingSlotService');

const createParkingSlot = async (req, res) => {
  try {
    const parkingSlotData = req.body;
    const parkingSlot = await ParkingSlotService.createParkingSlot(parkingSlotData);
    return res.status(201).json(parkingSlot);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to create parking slot' });
  }
};

const getParkingSlots = async (req, res) => {
  try {
    const parkingSlots = await ParkingSlotService.getAllParkingSlots();
    return res.status(200).json(parkingSlots);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to retrieve parking slots' });
  }
};

const getAvailableSlots = async (req, res) => {
  try {
    const availableSlots = await ParkingSlotService.findAvailableSlots();
    return res.status(200).json(availableSlots);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to retrieve available parking slots' });
  }
};

const getParkingSlotById = async (req, res) => {
  try {
    const { id } = req.params;
    const parkingSlot = await ParkingSlotService.getParkingSlotById(id);
    if (!parkingSlot) {
      return res.status(404).json({ message: 'Parking slot not found' });
    }
    return res.status(200).json(parkingSlot);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to retrieve parking slot' });
  }
};

const updateParkingSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const parkingSlotData = req.body;
    const updatedSlot = await ParkingSlotService.updateParkingSlot(id, parkingSlotData);
    if (!updatedSlot) {
      return res.status(404).json({ message: 'Parking slot not found' });
    }
    return res.status(200).json(updatedSlot);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to update parking slot' });
  }
};

const deleteParkingSlot = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ParkingSlotService.deleteParkingSlot(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Parking slot not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to delete parking slot' });
  }
};

module.exports = {
  createParkingSlot,
  getParkingSlots,
  getAvailableSlots,
  getParkingSlotById,
  updateParkingSlot,
  deleteParkingSlot,
};
