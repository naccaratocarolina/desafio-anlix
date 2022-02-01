require('./config/dotenv')();
require('./config/sequelize');
const path = require('path');
const cors = require('cors');
const express = require('express');
const routes = require('./routes/routes');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);

const fs = require('fs');
/*
const pathToData = path.join(__dirname, './database/data/indice_cardiaco', '01062021');
const cardiaco = fs.readFileSync(pathToData, 'utf8').toString().split('\n');
const data = cardiaco[1].toString().split(" ");
console.log(data[1]);
let myDate = new Date(data[1] * 1000);
console.log(myDate.toLocaleString());
*/

/*
const p = path.join(__dirname, './database/data/');
dirnames = fs.readdirSync(p);
  
dirnames.forEach(dir => {
  //const pathToData = path.join(__dirname, './database/data/indice_cardiaco', file);
  //const c = fs.readFileSync(pathToData, 'utf8').toString().split('\n');
  console.log(dir);
  
});
*/

const caminho = path.join(__dirname, './database/data/');
fs.readdirSync(caminho).filter(function (file) {
  //console.log(file);
  let dirPath = path.join(__dirname, './database/data', file);
  if (fs.lstatSync(dirPath).isDirectory()) {
    fs.readdirSync(dirPath).filter(function (f) {
      //console.log(f);
      let filePath = path.join(__dirname, 'database/data/', file, f);
      let data = fs.readFileSync(filePath, 'utf8').toString().split('\n');
      //console.log(data.length);
      let length = data.length;
      for (let i=1; i<length; i++) {
        //console.log(data[0].replace(/\s+/g, ' ').trim().split(" ")[2]);
        console.log(data[i].split(" "));
        console.log('\n');
      }
      //console.log(data[1].split(" ").length);
      //console.log(data[0].replace(/\s+/g, ' ').trim().split(" "));
    });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at ${process.env.APP_URL}`);
});
