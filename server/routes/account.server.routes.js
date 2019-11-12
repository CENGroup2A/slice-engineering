const account = require('../controllers/account.server.controller.js'),
    express = require('express'), 
    router = express.Router(),
    isAuth = require('../middleware/isAuth')

router.route('/login')
  .post(account.login);

router.route('/logout')
  .post(isAuth, account.logout);

router.route('/verify-email')
  .post(account.verifyEmail);

router.route('/signup')
  .post(account.signup);

router.route('/auth')
  .get(isAuth, account.auth);

module.exports = router;