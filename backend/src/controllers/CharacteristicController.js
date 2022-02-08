const Patient = require('../models/Patient');
const Characteristic = require('../models/Characteristic');
const sequelize = require("../config/sequelize");
const { Op } = require("sequelize");

const index = async (req, res) => {
  try {
    const characteristics = await Characteristic.findAll();
    return res.status(200).json({ characteristics });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// Consultar em uma única chamada, todas as características de um paciente,
// com os valores mais recentes de cada uma;
const indexPatientCharacteristic = async (req, res) => {
  const { id } = req.params;
  try {
      const ind_card = await Characteristic.findAll({ where: { patientId: id, type: "ind_card" }, order: [ ['epoch', 'DESC'] ], include: ["patient"] });
      const ind_pulm = await Characteristic.findAll({ where: { patientId: id, type: "ind_pulm" }, order: [ ['epoch', 'DESC'] ], include: ["patient"] });

      return res.status(200).json({ ind_card, ind_pulm });
  } catch (err) {
      return res.status(500).json({ err });
  }
};

// Consultar, para cada paciente, cada uma das características
// individualmente e cada uma delas sendo a mais recente disponível;
const show = async (req, res) => {
  const id = req.params.id;

  try {
      const ind_card = await Characteristic.findOne({ where: { patientId: id, type: "ind_card" }, order: [ ['epoch', 'DESC'] ], include: ["patient"] });
      const ind_pulm = await Characteristic.findOne({ where: { patientId: id, type: "ind_pulm" }, order: [ ['epoch', 'DESC'] ], include: ["patient"] });

      return res.status(200).json({ ind_card, ind_pulm });
  } catch (err) {
      return res.status(500).json({ err });
  }
};

const create = async (req, res) => {
  const { id } = req.params;

  const data = {
    type: req.body.type,
    epoch: req.body.epoch,
    index: req.body.index,
    patientId: id
  };

  try {
    const characteristics = await Characteristic.create(data);
    return res.status(201).json({ characteristics });
  } catch (err) {
      return res.status(500).json({ err });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Characteristic.update(req.body, { where: { id: id } });

    if (updated) {
      const characteristics = await Characteristic.findByPk(id);
      console.log('UDPATED');
      return res.status(200).send(characteristics);
    }

    throw new Error('Característica não encontrada.');
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Characteristic.destroy({ where: { id: id } });
    if (deleted)
      return res.status(200).json("Característica deletada com sucesso.");

      throw new Error ("Característica não encontrado.");
    } catch (err) {
      return res.status(500).json({ err });
    }
};

module.exports = {
    index,
    indexPatientCharacteristic,
    show,
    create,
    update,
    destroy,
}
