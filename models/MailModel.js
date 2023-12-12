const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Mail = sequelize.define("Mail", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  subject: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sender: {
    type: Sequelize.STRING,
  },
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Mail;
