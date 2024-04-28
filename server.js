const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

const { DB_HOST: urlDb } = process.env;
const connection = mongoose.connect(urlDb);


const startServer = async () => {
  try {
    await connection;
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  }
};
startServer();
