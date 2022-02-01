const Characteristic = require("../../models/Characteristic");

const fs = require('fs');
const path = require('path');

const characteristicSeeder = async function () {
  try {
    await Characteristic.sync({ force: true });
    
    const pathToDir = path.join(__dirname, '../data/');
    // Itera pelos diretorios de ../data
    fs.readdirSync(pathToDir).filter(async function (dir) {
      let dirPath = path.join(__dirname, '../data/', dir);

      if (fs.lstatSync(dirPath).isDirectory()) {
        // Itera pelos arquivos dos diretorios de ../data
        fs.readdirSync(dirPath).filter(async function (file) {
          let filePath = path.join(__dirname, '../data/', dir, file);
          let data = fs.readFileSync(filePath, 'utf8').toString().split('\n');
          
          let length = data.length;
          for (let i=1; i<length; i++) {
            let line = data[i].split(" ");

            let characteristic = await Characteristic.create({
              type: data[0].replace(/\s+/g, ' ').trim().split(" ")[2],
              epoch: new Date(line[1] * 1000),
              index: parseFloat(line[2].replace(",", "."))
            });
          }
        });
      }
    });
  } catch (err) { console.log(err); }
}

module.exports = characteristicSeeder;
