const Patient = require('../models/Patient');
const Characteristic = require('../models/Characteristic');
const sequelize = require("../config/sequelize");
const { Op } = require("sequelize");

const index = async (req, res) => {
  try {
    const patients = await Patient.findAll( { include: ["characteristics"] } );
    return res.status(200).json({ patients });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const patients = await Patient.findByPk(id, { include: ["characteristics"] });
    return res.status(200).json({ patients });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const create = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    return res.status(201).json({ patient });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Patient.update(req.body, { where: { id: id } });

    if (updated) {
      const patient = await Patient.findByPk(id);
      console.log('UDPATED');
      return res.status(200).send(patient);
    }

    throw new Error('Patiente não encontrado.');
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Patient.destroy({ where: { id: id } });

    if (deleted)
      return res.status(200).json("Patiente deletado com sucesso.");

      throw new Error ("Patiente não encontrado.");
    } catch (err) {
      return res.status(500).json({ err });
    }
};

// Consultar pacientes que contenham um nome ou parte
// de um nome a ser especificado na chamada da API
const name = async (req, res) => {
  try {
      const patients = await Patient.findAll({ where: { name: { [Op.like]: '%' + req.body.query + '%' } }, include: ["characteristics"] });
      return res.status(200).json({ patients });
  } catch (err) {
      return res.status(500).json({ err });
  }
};

module.exports = {
    index,
    show,
    create,
    update,
    destroy,
    name,
}
