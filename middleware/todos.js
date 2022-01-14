const jwt = require("jsonwebtoken");
const TodoModel = require("../models/Todos");
const { responseError } = require("./response");


exports.attachUserToTodo = (req, res, next) => {
  if (!req.body || !req.body.task) {
    responseError(res, 400, "Veuillez remplir tous les champs");
  }

  try {
    req.body.user = req.decoded.userId;
  } catch (err) {
    responseError(res, 400, err.message);
  }

  next();
};

exports.findTodoCurrentUser = (req, res, next) => {
  try {
    req.params.userId = req.decoded.userId;
  } catch (err) {
    responseError(res, 400, err.message);
  }

  next();
};

exports.checkTodoForUser = async (req, res, next) => {
  if (
    !req.params.id ||
    (req.params.id && !req.params.id.match(/^[0-9a-fA-F]{24}$/))
  ) {
    responseError(res, 400, "Un identifiant valide est requis.");
  }

  try {
    let userId = req.decoded.userId,
      todoId = req.params.id;

    const todo = await TodoModel.findOne({ _id: todoId });

    if (!todo) {
      responseError(res, 400, "Todo introuvable");
    }

    if (todo.user.toString() !== userId) {
      responseError(res, 401, "Vous n'avez pas les droits pour cette action");
    }

    if (req.method === "PUT") {
      req.body.user = userId;
      req.body._id = todoId;
    }
  } catch (err) {
    responseError(res, 400, err.message);
  }

  next();
};
