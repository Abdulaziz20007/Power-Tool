const { errorHandler } = require("../helpers/error_handler");
const Owner = require("../models/Owner");
const Shop = require("../models/Shop");

const createShop = async (req, res) => {
  try {
    const { name, phone_number, address, location, ownerId } = req.body;
    const newShop = await Shop.create({
      name,
      phone_number,
      address,
      location,
      ownerId,
    });
    console.log(newShop);

    return res.status(201).send(newShop);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getAll = async (req, res) => {
  try {
    const shops = await Shop.findAll({ include: Owner });
    res.status(200).send(shops);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    // const shop = await Shop.findOne({ id });
    const shop = await Shop.findByPk(id);
    res.status(200).send(shop);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldShop = await Shop.findByPk(id);
    if (!oldShop) {
      return res.status(404).send({ msg: "Shop not found" });
    }
    const { name, address, phone_number, location, ownerId } = {
      ...oldShop,
      ...req.body,
    };
    const shop = await Shop.update(
      { name, address, phone_number, location, ownerId },
      { where: { id }, returning: true }
    );
    res.status(200).send(shop);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldShop = await Shop.findByPk(id);
    if (!oldShop) {
      return res.status(404).send({ msg: "Shop topilmadi" });
    }
    await Shop.destroy({ where: { id } });
    res.status(200).send(oldShop);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  createShop,
  getAll,
  getById,
  updateById,
  deleteById,
};
