const app = require("./app");
const sequelize = require("./config/database");
require("./models");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.authenticate();

    console.log("Database Connected Successfully");

    await sequelize.sync();

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