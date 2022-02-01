require('../../config/dotenv')();
require('../../config/sequelize');

const patientSeeder = require('./PatientSeeder');
const characteristicSeeder = require('./CharacteristicSeeder');

(async () => {
  try {
    await patientSeeder();
    //await characteristicSeeder();
  } catch(err) { console.log(err) }
})();

