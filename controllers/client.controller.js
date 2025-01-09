const { errorHandler } = require("../helpers/error_handler");
const Client = require("../models/Clients");

const createClient = async (req, res) => {
  try {
    const { name, phone_number, address } = req.body;
    const newClient = await Client.create({ name, phone_number, address });
    console.log(newClient);

    return res.status(201).send(newClient);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getAll = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).send(clients);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    // const client = await Client.findOne({ id });
    const client = await Client.findByPk(id);
    res.status(200).send(client);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldClient = await Client.findByPk(id);
    if (!oldClient) {
      return res.status(404).send({ msg: "Client not found" });
    }
    const { name, address, phone_number } = { ...oldClient, ...req.body };
    const client = await Client.update(
      { name, address, phone_number },
      { where: { id }, returning: true }
    );
    res.status(200).send(client);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldClient = await Client.findByPk(id);
    if (!oldClient) {
      return res.status(404).send({ msg: "Client not found" });
    }
    await Client.destroy({ where: { id } });
    res.status(200).send(oldClient);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  createClient,
  getAll,
  getById,
  updateById,
  deleteById,
};
