const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Owner = require("./Owner");

const Shop = sequelize.define(
  "shop",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    address: {
      type: DataTypes.STRING(50),
    },
    phone_number: {
      type: DataTypes.STRING(15),
    },
    location: {
      type: DataTypes.STRING(50),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Shop.belongsTo(Owner);
Owner.hasMany(Shop);

module.exports = Shop;
