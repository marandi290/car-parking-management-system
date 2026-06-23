const DashboardService = require("../services/dashboardService");

const getDashboardStats = async (req, res) => {
  try {
    const stats = await DashboardService.getDashboardStats();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTotalRevenue = async (req, res) => {
  try {
    const revenue = await DashboardService.getTotalRevenue();

    return res.status(200).json({
      success: true,
      data: revenue,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getActiveVehicles = async (req, res) => {
  try {
    const vehicles = await DashboardService.getActiveVehicles();

    return res.status(200).json({
      success: true,
      data: vehicles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getParkingHistory = async (req, res) => {  
  try {
    const history = await DashboardService.getParkingHistory();

    return res.status(200).json({
      success: true,
      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getTotalRevenue,
  getActiveVehicles,
  getParkingHistory,
};