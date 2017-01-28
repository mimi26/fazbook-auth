const bcrypt = require('bcryptjs');
const models = require('../db/models/index');

//use bcrypt to compare user inputted password to encrypted password stored
//in database for that user
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}
