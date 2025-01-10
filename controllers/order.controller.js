const { errorHandler } = require("../helpers/error_handler");
const Order = require("../models/Order");
const ShopTool = require("../models/ShopTool");
const Clients = require("../models/Clients");

const createOrder = async (req, res) => {
  try {
    const { client_id, shop_tool_id, period } = req.body;

    const client = await Clients.findByPk(client_id);
    if (!client) {
      return res.status(404).send({
        msg: `Client with id ${client_id} not found`,
      });
    }

    const shopTool = await ShopTool.findByPk(shop_tool_id);
    if (!shopTool) {
      return res.status(404).send({
        msg: `Shop tool with id ${shop_tool_id} not found`,
      });
    }

    const total_price = shopTool.rent_price * period;

    const order = await Order.create({
      client_id,
      shop_tool_id,
      period,
      total_price,
    });

    const result = await Order.findByPk(order.id, {
      include: [
        {
          model: Clients,
          attributes: ["name", "surname", "phone_number"],
        },
        {
          model: ShopTool,
          attributes: ["rent_price", "tool_price"],
        },
      ],
    });

    return res.status(201).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Clients,
          attributes: ["name", "surname", "phone_number"],
        },
        {
          model: ShopTool,
          attributes: ["rent_price", "tool_price"],
        },
      ],
    });
    res.status(200).send(orders);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Clients,
          attributes: ["name", "surname", "phone_number"],
        },
        {
          model: ShopTool,
          attributes: ["rent_price", "tool_price"],
        },
      ],
    });
    if (!order) {
      return res.status(404).send({ msg: "Order not found" });
    }
    res.status(200).send(order);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const { shop_tool_id, period } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).send({ msg: "Order not found" });
    }

    if (shop_tool_id && period) {
      const shopTool = await ShopTool.findByPk(shop_tool_id);
      if (!shopTool) {
        return res.status(404).send({
          msg: `Shop tool with id ${shop_tool_id} not found`,
        });
      }

      const total_price = shopTool.rent_price * period;
      await order.update({ shop_tool_id, period, total_price });
    }

    const result = await Order.findByPk(id, {
      include: [
        {
          model: Clients,
          attributes: ["name", "surname", "phone_number"],
        },
        {
          model: ShopTool,
          attributes: ["rent_price", "tool_price"],
        },
      ],
    });
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).send({ msg: "Order not found" });
    }

    await order.destroy();
    res.status(200).send(order);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  createOrder,
  getAll,
  getById,
  updateById,
  deleteById,
};
