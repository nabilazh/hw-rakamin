const express = require("express");
const app = express();
const sequelize = require("./config/database.js");
const todoRoutes = require("./routes/todoRoutes");

// Sync database models
sequelize.sync();

app.use(express.json());

app.use("/todos", todoRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
