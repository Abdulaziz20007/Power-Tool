const sequelize = require("../config/db");

const { DataTypes } = require("sequelize");
const Shop = require("./Shop");
const Tool = require("./Tool");

const ShopTool = sequelize.define(
  "shop_tool",
  {
    rent_price: {
      type: DataTypes.DECIMAL(15, 2),
    },
    tool_price: {
      type: DataTypes.DECIMAL(15, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Shop.belongsToMany(Tool, { through: ShopTool });
Tool.belongsToMany(Shop, { through: ShopTool });

module.exports = ShopTool;
