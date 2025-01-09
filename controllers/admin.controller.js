const { errorHandler } = require("../helpers/error_handler");
const Admin = require("../models/Admin");

const createAdmin = async (req, res) => {
  try {
    const { name, phone_number } = req.body;
    const admin = await Admin.create({ name, phone_number });

    return res.status(201).send(admin);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getAll = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).send(admins);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findByPk(id);
    res.status(200).send(admin);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldAdmin = await Admin.findByPk(id);
    if (!oldAdmin) {
      return res.status(404).send({ msg: "Admin toplmadi" });
    }
    const { name, phone_number } = { ...oldAdmin, ...req.body };
    const admin = await Admin.update(
      { name, phone_number },
      { where: { id }, returning: true }
    );
    res.status(200).send(admin);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldAdmin = await Admin.findByPk(id);
    if (!oldAdmin) {
      return res.status(404).send({ msg: "Admin not found" });
    }
    await Admin.destroy({ where: { id } });
    res.status(200).send(oldAdmin);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  createAdmin,
  getAll,
  getById,
  updateById,
  deleteById,
};
