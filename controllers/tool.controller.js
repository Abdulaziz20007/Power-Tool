const { errorHandler } = require("../helpers/error_handler");
const Tool = require("../models/Tool");

const createTool = async (req, res) => {
  try {
    const { name, brand, description } = req.body;
    const newTool = await Tool.create({ name, brand, description });
    console.log(newTool);

    return res.status(201).send(newTool);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getAll = async (req, res) => {
  try {
    const tools = await Tool.findAll();
    res.status(200).send(tools);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const tool = await Tool.findByPk(id);
    res.status(200).send(tool);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldTool = await Tool.findByPk(id);
    if (!oldTool) {
      return res.status(404).send({ msg: "Tool not found" });
    }
    const { name, brand, description } = { ...oldTool, ...req.body };
    const tool = await Tool.update(
      { name, brand, description },
      { where: { id }, returning: true }
    );
    res.status(200).send(tool);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldTool = await Tool.findByPk(id);
    if (!oldTool) {
      return res.status(404).send({ msg: "Tool not found" });
    }
    await Tool.destroy({ where: { id } });
    res.status(200).send(oldTool);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  createTool,
  getAll,
  getById,
  updateById,
  deleteById,
};
