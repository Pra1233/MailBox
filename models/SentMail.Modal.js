const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const SentMail = sequelize.define("SentMail", {
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
});

module.exports = SentMail;
