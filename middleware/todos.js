const jwt = require('jsonwebtoken');

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
            message: 'Une erreur est survenue.',
        });

    }

    next();

}