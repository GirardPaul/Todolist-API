const TodoModel = require("../models/Todos");

exports.create = async (req, res) => {
    
    try {
        const todo = await TodoModel.create(req.body);

        res.status(200).json(todo);

    } catch (error) {

        res.status(400).json({
            message: "Une erreur est survenue.",
            statusCode: 400,
        });

    }

};