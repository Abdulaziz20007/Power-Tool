const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");

const Owner = sequelize.define(
  "owner",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
    },
    surname: {
      type: DataTypes.STRING(30),
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

module.exports = Owner;
