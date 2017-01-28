const passport = require('passport');
const models = require('../db/models/index');

//serialize user data by changing from JSON object into a form
//that can be stored in memory.
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

//deserialize user data back into JSON form.
  passport.deserializeUser((id, done) => {
    models.User.findById(id)
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
  });
};
