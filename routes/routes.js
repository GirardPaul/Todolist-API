const router = require('express').Router(),
    UserController = require('../controllers/UserController');

router.route('/signup')
    .post(UserController.createUser);

router.route('/login')
    .post(UserController.loginUser);

module.exports = router;