const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Patient = sequelize.define('Patient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  rg: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },

  sign: {
    type: DataTypes.STRING,
    allowNull: false
  },

  mother: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  father: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  cep: {
    type: DataTypes.STRING,
    allowNull: false
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false
  },

  number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false
  },

  state: {
    type: DataTypes.STRING,
    allowNull: false
  },

  landline: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  height: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  weight: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  blood_type: {
    type: DataTypes.STRING,
    allowNull: false
  },

  color: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Patient.associate = function (models) {
    Patient.hasMany(models.Characteristic, { as: "characteristics", foreignKey: "patientId", onDelete: "cascade" });
}

module.exports = Patient;
