const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Characteristic = sequelize.define('Characteristic', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  epoch: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  index: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
});

Characteristic.associate = function (models) {
    Characteristic.belongsTo(models.Patient, { as: "patient", foreignKey: "patientId", onDelete: "cascade" });
}

module.exports = Characteristic;
