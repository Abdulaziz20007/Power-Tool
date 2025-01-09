const { errorHandler } = require("../helpers/error_handler");
const District = require("../models/District");

const createDistrict = async (req, res) => {
  try {
    const { name } = req.body;
    const newDistrict = await District.create({ name });
    console.log(newDistrict);

    return res.status(201).send(newDistrict);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getAll = async (req, res) => {
  try {
    const districts = await District.findAll();
    res.status(200).send(districts);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const district = await District.findByPk(id);
    res.status(200).send(district);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldDistrict = await District.findByPk(id);
    if (!oldDistrict) {
      return res.status(404).send({ msg: "District not found" });
    }
    const { name } = { ...oldDistrict, ...req.body };
    const district = await District.update(
      { name },
      { where: { id }, returning: true }
    );
    res.status(200).send(district);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldDistrict = await District.findByPk(id);
    if (!oldDistrict) {
      return res.status(404).send({ msg: "District not found" });
    }
    await District.destroy({ where: { id } });
    res.status(200).send(oldDistrict);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  createDistrict,
  getAll,
  getById,
  updateById,
  deleteById,
};
