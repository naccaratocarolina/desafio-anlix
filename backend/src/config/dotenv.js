module.exports = function configDotenv() {
  const result = require('dotenv').config();
  if (result.error) { throw result.error; }
}
