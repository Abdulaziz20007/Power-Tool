const { errorHandler } = require("../helpers/error_handler");
const ShopTool = require("../models/ShopTool");

const createShopTool = async (req, res) => {
  try {
    const { rent_price, tool_price, shopId, toolId } = req.body;
    const newShopTool = await ShopTool.create({
      rent_price,
      tool_price,
      shopId,
      toolId,
    });
    console.log(newShopTool);

    return res.status(201).send(newShopTool);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getAll = async (req, res) => {
  try {
    const shop_tools = await ShopTool.findAll();
    res.status(200).send(shop_tools);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const shop_tool = await ShopTool.findByPk(id);
    res.status(200).send(shop_tool);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldShopTool = await ShopTool.findByPk(id);
    if (!oldShopTool) {
      return res.status(404).send({ msg: "ShopTool not found" });
    }
    const { rent_price, tool_price, shopId, toolId } = {
      ...tool_price,
      ...req.body,
    };
    const shop_tool = await ShopTool.update(
      { rent_price, shop_tool_price, shopId, toolId },
      { where: { id }, returning: true }
    );
    res.status(200).send(shop_tool);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldShopTool = await ShopTool.findByPk(id);
    if (!oldShopTool) {
      return res.status(404).send({ msg: "ShopTool not found" });
    }
    await ShopTool.destroy({ where: { id } });
    res.status(200).send(oldShopTool);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  createShopTool,
  getAll,
  getById,
  updateById,
  deleteById,
};
