const TodoModel = require("../models/Todos");
const { responseData, responseError } = require("../middleware/response");

exports.create = async (req, res) => {
  try {
    const todo = await TodoModel.create(req.body);
    responseData(res, 200, "Todo created successfully", todo);
  } catch (error) {
    responseError(res, 400, error.message);
  }
};

exports.findAll = async (req, res) => {
  const userId = req.params.userId;
  const todosUser = await TodoModel.find({ user: userId });
  if (!todosUser || todosUser.length === 0) {
    responseError(res, 404, "Aucun todo trouvé.");
  }
  responseData(res, 200, "Todo retreived successfully", todosUser);
};

exports.findOne = async (req, res) => {
  const todosUser = await TodoModel.find({ _id: req.params.id });
  responseData(res, 200, "Todo retreived successfully", todosUser);
};

exports.update = async (req, res) => {
  await TodoModel.findById(req.params.id, (err, todo) => {
    if (err) {
      responseError(res, 404, err);
    }

    todo.task = req.body.task ? req.body.task : todo.task;
    todo.done = req.body.done ? req.body.done : todo.done;
    todo.updatedAt = Date.now();

    todo.save((err) => {
      if (err) {
        responseError(res, 400, err);
      }

      responseData(res, 200, "Todo updated successfully", todo);
    });
  });
};

exports.delete = async (req, res) => {
  TodoModel.remove({ _id: req.params.id }, (err) => {
    if (err) {
      responseError(res, 400, err);
    }
    responseData(res, 204, "Todo deleted successfully", { _id: req.params.id });
  });
};
