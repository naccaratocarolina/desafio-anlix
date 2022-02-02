const Patient = require("../../models/Patient");
const Characteristic = require("../../models/Characteristic");

const fs = require('fs');
const path = require('path');

const dic = [];

const pathToData = path.join(__dirname, '../data/', 'pacientes.json');
const patients = JSON.parse(fs.readFileSync(pathToData, 'utf8'));

const size = Object.keys(patients).length;
for (let i=0; i<size; i++) {
  let patient = {
    name: patients[i].nome,
    age: patients[i].idade,
    cpf: patients[i].cpf,
    rg: patients[i].rg,
    date_of_birth: new Date(patients[i].data_nasc.split('/').reverse().join('-') + ' 00:00:00'),
    gender: patients[i].sexo,
    sign: patients[i].signo,
    mother: patients[i].mae,
    father: patients[i].pai,
    email: patients[i].email,
    password: patients[i].senha,
    cep: patients[i].cep,
    address: patients[i].endereco,
    number: patients[i].numero,
    neighborhood: patients[i].bairro,
    city: patients[i].cidade,
    state: patients[i].estado,
    landline: patients[i].telefone_fixo,
    phone_number: patients[i].celular,
    height: parseFloat(patients[i].altura.replace(",", ".")),
    weight: patients[i].peso,
    blood_type: patients[i].tipo_sanguineo,
    color: patients[i].cor,
    characteristics: []
  }

  dic.push(patient);
}

const pathToDir = path.join(__dirname, '../data/');
fs.readdirSync(pathToDir).filter(function (dir) {
  let dirPath = path.join(__dirname, '../data', dir);

  if (fs.statSync(dirPath).isDirectory()) {
    fs.readdirSync(dirPath).filter(function (file) {
      let filePath = path.join(__dirname, '../data/', dir, file);
      let data = fs.readFileSync(filePath, 'utf8').toString().split('\n');

      let length = data.length;
      for (let i=1; i<length - 1; i++) {
        const info = data[i].split(" ");

        let dicLength = Object.keys(dic).length;
        for (let i=0; i<dicLength; i++) {
          if (dic[i].cpf === info[0]) {
            let characteristic = {
              type: data[0].replace(/\s+/g, ' ').trim().split(" ")[2],
              epoch: new Date(info[1] * 1000),
              index: info[2],
            };

            dic[i].characteristics.push(characteristic);
            continue;
          }
        }
      }
    });
  }
});

const patientSeeder = async function () {
  try {
    await Patient.sync({ truncate: true });

    for (let i=0; i<size; i++) {
      try {
        let paciente = await Patient.create(dic[i], { include: [ "characteristics" ] });
      } catch (err) { console.log(err); }
    }

  } catch (err) { console.log(err); }
}

module.exports = patientSeeder;
