const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Clients = require("./Clients");
const ShopTool = require("./ShopTool");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    client_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    shop_tool_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    order_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    period: {
      type: DataTypes.BIGINT,
    },
    total_price: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Order.belongsTo(Clients, { foreignKey: "client_id" });
Clients.hasMany(Order, { foreignKey: "client_id" });

Order.belongsTo(ShopTool, { foreignKey: "shop_tool_id" });
ShopTool.hasMany(Order, { foreignKey: "shop_tool_id" });

module.exports = Order;
