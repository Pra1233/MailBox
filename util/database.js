const Sequelize = require("sequelize");

const sequelize = new Sequelize("mailbox", "root", "prabhat", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
