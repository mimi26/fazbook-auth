const bcrypt = require('bcryptjs');
const models = require('../db/models/index');

//use bcrypt to compare user inputted password to encrypted password stored
//in database for that user
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

//function that is called in auth.js when a user navigates
//to the auth/register route. If the user is already a user (req.user is true)
//they get the 401 msg. the function calls next to go to the next middleware if the
//user is not logged in.
function loginRedirect (req, res, next) {
  if (req.user) return res.status(401).json(
    { status: 'You are already logged in' }
    );

    return next();
}

//create user data and insert into table
//including password which gets encrypted
//this function gets called in our .post command
//in the auth.js file. redirect user back to home page.
function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.email
  }).then(() => {
    res.redirect('/');
  });
}
