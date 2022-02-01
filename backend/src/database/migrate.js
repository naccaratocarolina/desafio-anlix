
require('../config/dotenv')();
const sequelize = require('../config/sequelize');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  }
  catch (error) { console.log(error) };
})();
