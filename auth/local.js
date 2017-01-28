const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');

const options = {};

init();

//set up LocalStrategy: user needs local username and password
//as opposed to oauth where user can login with other accounts like google, etc.
//create new instance of LocalStrategy
//check if there is a user. If yes, compare inputted password with user's
//password in db in dataValue. if they match, return the dataValue, meaning
//allow the user to see their user profile with all profile info.
passport.use(new LocalStrategy(options, (username, password, done) => {
  models.User.findAll({
    where: {
      username
    }
  })
  .then((user) => {
    if (user[0] === undefined) {
      return done(null, false);
    }
    if (!authHelpers.comparePass(password, user[0].dataValues.password)) {
      return done(null, false);
    } else {
      return done(null, user[0].dataValues);
    }
  })
  .catch((err) => { return done(err); });
}));

module.exports = passport;


