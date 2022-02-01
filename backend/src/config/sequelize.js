const { Sequelize } = require("sequelize");

const sequelize = (process.env.DB_CONNECTION === 'sqlite')?
  new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_HOST + process.env.DB_DATABASE
  })
  :
  new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_CONNECTION,
        models: [__dirname + "/../models"]
    }
  );
module.exports = sequelize;

// Models declaration
// require('../models/Patient');

for (mod in sequelize.models) {
  if (sequelize.models[mod].associate instanceof Function) {
    sequelize.models[mod].associate(sequelize.models);
  }
}
