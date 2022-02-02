const Patient = require('../models/Patient');
const Characteristic = require('../models/Characteristic');
const sequelize = require("../config/sequelize");
const { Op } = require("sequelize");

// Consultar em uma única chamada, todas as características de um paciente,
// com os valores mais recentes de cada uma;
const index = async (req, res) => {
  const { id } = req.params;
  try {
      const ind_card = await Characteristic.findAll({ where: { patientId: id, type: "ind_card" }, order: [ ['epoch', 'DESC'] ] });
      const ind_pulm = await Characteristic.findAll({ where: { patientId: id, type: "ind_pulm" }, order: [ ['epoch', 'DESC'] ] });

      return res.status(200).json({ ind_card, ind_pulm });
  } catch (err) {
      return res.status(500).json({ err });
  }
};

// Consultar, para cada paciente, cada uma das características
// individualmente e cada uma delas sendo a mais recente disponível;
const show = async (req, res) => {
  const id = req.params.id;
  const type = (req.params.type == 1) ? "ind_card" : "ind_pulm";

  try {
      const characteristic = await Characteristic.findOne({ where: { patientId: id, type: type }, order: [ ['epoch', 'DESC'] ] });

      return res.status(200).json({ characteristic });
  } catch (err) {
      return res.status(500).json({ err });
  }

};

// Consultar para uma determinada data (dia, mês e ano),
// todas as características existentes de todos os pacientes da base de dados;
const dates = async (req, res) => {
  const from = new Date(req.body.from + " 00:00:00");
  const to = new Date(req.body.to + " 00:00:00");

  try {
    const characteristics = await Characteristic.findAll({ where: { epoch: { [Op.between]: [from, to] } }, order: [ ['epoch', 'DESC'] ] });

    return res.status(200).json({ characteristics });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// Consultar uma característica qualquer de um paciente para um intervalo
// de datas a ser especificado na chamada da API;
const rangeDate = async (req, res)  => {
  const { id } = req.params;
  const from = new Date(req.body.from + " 00:00:00");
  const to = new Date(req.body.to + " 00:00:00");

  try {
    const characteristics = await Characteristic.findAll({ where: { patientId: id, epoch: { [Op.between]: [from, to] } }, order: [ ['epoch', 'DESC'] ] });

    return res.status(200).json({ characteristics });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// Consultar o valor mais recente de uma característica de um paciente que
// esteja entre um intervalo de valores a ser especificado na chamada da API;
const rangeInd = async (req, res) => {
  const id = req.params.id;
  const type = (req.params.type == 1) ? "ind_card" : "ind_pulm";
  const from = req.body.from;
  const to = req.body.to;

  console.log(from);
  try {
    const characteristic = await Characteristic.findOne({ where: { patientId: id, type: type, index: { [Op.between]: [from, to] } }, order: [ ['epoch', 'DESC'] ] })
    return res.status(200).json({ characteristic });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

module.exports = {
    index,
    show,
    dates,
    rangeDate,
    rangeInd,
}
