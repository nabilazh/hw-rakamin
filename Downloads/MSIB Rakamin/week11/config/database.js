const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("todo_db", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: true,
    paranoid: true, // Enables soft deletes
  },
});

module.exports = sequelize;
