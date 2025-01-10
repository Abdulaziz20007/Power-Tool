const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Order = require("./Order");
const Tool = require("./Tool");

const OrderTool = sequelize.define(
  "order_tool",
  {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    price_per_unit: {
      type: DataTypes.DECIMAL(15, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Order.belongsToMany(Tool, { through: OrderTool });
Tool.belongsToMany(Order, { through: OrderTool });

module.exports = OrderTool;
