const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");

const Admin = sequelize.define(
  "owner",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    phone_number: {
      type: DataTypes.STRING(15),
    },
    otp_id: {
      type: DataTypes.UUID,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Admin;
