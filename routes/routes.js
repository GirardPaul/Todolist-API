const router = require('express').Router(),
    UserController = require('../controllers/UserController'),
    authentification = require('../middleware/authentification'),
    todos = require('../middleware/todos'),
    TodoController = require('../controllers/TodoController');

router.route('/signup')
    .post(UserController.createUser);

router.route('/login')
    .post(UserController.loginUser);

router.route('/todos')
    .post(authentification.verifyToken, todos.attachUserToTodo, TodoController.create);

module.exports = router;