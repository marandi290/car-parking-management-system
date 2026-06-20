const app = require("./app");
const sequelize = require("./config/database");
const User = require("./models/User");
const ParkingSlot = require("./models/ParkingSlot");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("Database Connected Successfully");

    await sequelize.sync({ alter: true });

    console.log("Database Synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error);
  }
}

startServer();