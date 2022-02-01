const Patient = require("../../models/Patient");

const fs = require('fs');
const path = require('path');

const pathToData = path.join(__dirname, '../data', 'pacientes.json');
const patients = JSON.parse(fs.readFileSync(pathToData, 'utf8'));

const patientSeeder = async function () {
  try {
    await Patient.sync({ force:true  });

    let lenght = Object.keys(patients).length;
    for (let i=0; i<lenght; i++) {
      let date = new Date(patients[i].data_nasc.split('/').reverse().join('-') + ' 00:00:00');

      let patient = await Patient.create({
        name: patients[i].nome,
        age: patients[i].idade,
        cpf: patients[i].cpf,
        rg: patients[i].rg,
        date_of_birth: date,
        gender: patients[i].sexo,
        sign: patients[i].signo,
        mother: patients[i].mae,
        father: patients[i].pai,
        email: patients[i].email,
        password: patients[i].senha,
        landline: patients[i].telefone_fixo,
        phone_number: patients[i].celular,
        height: parseFloat(patients[i].altura.replace(",", ".")),
        weight: patients[i].peso,
        blood_type: patients[i].tipo_sanguineo,
        color: patients[i].cor
      });
    }

  } catch (err) { console.log(err);  }
}

module.exports = patientSeeder;
