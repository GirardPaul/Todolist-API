const jwt = require('jsonwebtoken');
const TodoModel = require("../models/Todos");


exports.attachUserToTodo = (req, res, next) => {

    if(!req.body || !req.body.task){
        return res.status(400).json({
            success: false,
            message: 'Vous devez remplir tout les champs'
        });
    }

    try {
        req.body.user = req.decoded.userId;
    } catch(err) {

        return res.status(400).json({
            success: false,
            message: err,
        });

    }

    next();

}

exports.findTodoCurrentUser = (req, res, next) => {

    try {
        req.params.userId = req.decoded.userId;
    } catch(err) {

        return res.status(400).json({
            success: false,
            message: err,
        });

    }

    next();

}

exports.checkTodoForUser = async (req, res, next) => {

    if(!req.params.id || (req.params.id && !req.params.id.match(/^[0-9a-fA-F]{24}$/))){
        return res.status(400).json({
            success: false,
            message: 'Un identifiant valide est requis.',
        });
    }

    try {
        let userId = req.decoded.userId,
            todoId = req.params.id;


        const todo = await TodoModel.findOne({ _id: todoId });

        if(!todo){
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        if(todo.user.toString() !== userId){
            return res.status(401).json({
                success: false,
                message: 'You are not the user of this todo.',
            });
        }

        if(req.method === 'PUT'){
            req.body.user = userId;
            req.body._id = todoId;
        }

    } catch(err) {

        return res.status(400).json({
            success: false,
            message: err,
        });

    }

    next();

}

