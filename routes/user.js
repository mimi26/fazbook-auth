const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/auth-helpers');

/* GET user profile page. */
// add route here

//set up route to user profile page.
//get request for dataValue which is user data
//from table. loginRequired is called to make sure user is logged in
//before displaying data to protect the route.

router.get('/', authHelpers.loginRequired, (req, res, next) => {
  res.render('user/index', {
    user: req.user.dataValues
  });
});

module.exports = router;
