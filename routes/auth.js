const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');
//if user is logged in, loginRedirect will redirect them to their profile page
//otherwise, they will go to the auth/register route where
//a form is rendered for user to enter their data and username and password.
router.get('/register', authHelpers.longinRedirect, (req, res) => {
  res.render('auth/register');
});
//post user's inputted info to the database
router.post('register', (req, res, next) => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    console.log('registration successful');
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
});

//login route. call the same function to check if user is already logged in.
//if not render for to enter username and password
router.get('/login', authHelpers.loginRedirect, (req, res) => {
  res.render('auth/login');
});

//post username and password to databse,
//and checks if correct
router.post('/login', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth/login',
  failureFlash: true
  })
);

//logout, redirect back to home route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
