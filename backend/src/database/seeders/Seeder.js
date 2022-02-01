require('../../config/dotenv')();
require('../../config/sequelize');

const patientSeeder = require('./PatientSeeder');

(async () => {
  try {
    await patientSeeder();
    
  } catch(err) { console.log(err) }
})();

