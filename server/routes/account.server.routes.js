const account = require('../controllers/account.server.controller.js'),
    express = require('express'), 
    router = express.Router(),
    passport = require('passport'),
    isAuth = require('../middleware/isAuth')

router.route('/login')
  .post(passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  account.login
);

router.route('/logout')
  .post(isAuth, account.logout)

router.route('/signup')
  .post(account.signup);

router.route('/auth')
  .get(isAuth, account.auth)

module.exports = router;