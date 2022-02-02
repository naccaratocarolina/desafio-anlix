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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at ${process.env.APP_URL}`);
});
