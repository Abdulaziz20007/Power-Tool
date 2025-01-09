const { errorHandler } = require("../helpers/error_handler");
const Owner = require("../models/Owner");

const createOwner = async (req, res) => {
  try {
    const { name, surname, phone_number } = req.body;
    const newOwner = await Owner.create({ name, surname, phone_number });
    console.log(newOwner);

    return res.status(201).send(newOwner);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getAll = async (req, res) => {
  try {
    const owners = await Owner.findAll();
    res.status(200).send(owners);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const owner = await Owner.findByPk(id);
    res.status(200).send(owner);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldOwner = await Owner.findByPk(id);
    if (!oldOwner) {
      return res.status(404).send({ msg: "Owner not found" });
    }
    const { name, surname, phone_number } = { ...oldOwner, ...req.body };
    const owner = await Owner.update(
      { name, surname, phone_number },
      { where: { id }, returning: true }
    );
    res.status(200).send(owner);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldOwner = await Owner.findByPk(id);
    if (!oldOwner) {
      return res.status(404).send({ msg: "Owner not found" });
    }
    await Owner.destroy({ where: { id } });
    res.status(200).send(oldOwner);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  createOwner,
  getAll,
  getById,
  updateById,
  deleteById,
};
