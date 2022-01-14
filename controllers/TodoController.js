const TodoModel = require("../models/Todos");

exports.create = async (req, res) => {
  try {
    const todo = await TodoModel.create(req.body);

    return res.status(200).json(todo);
  } catch (error) {
    return res.status(400).json({
      message: "Une erreur est survenue.",
      statusCode: 400,
    });
  }
};

exports.findAll = async (req, res) => {
  const userId = req.params.userId;
  const todosUser = await TodoModel.find({ user: userId });
  return res.status(200).json(todosUser);
};

exports.findOne = async (req, res) => {
  const todosUser = await TodoModel.find({ _id: req.params.id });
  return res.status(200).json(todosUser);
};

exports.update = async (req, res) => {
  await TodoModel.findById(req.params.id, (err, todo) => {
    if (err) {
      return res.status(404).json({
        success: false,
        message: err,
      });
    }

    todo.task = req.body.task ? req.body.task : todo.task;
    todo.done = req.body.done ? req.body.done : todo.done;
    todo.updatedAt = Date.now();

    todo.save((err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err,
        });
      }

      return res.status(200).json({
        message: "Todo updated successfully",
        todo,
      });
    });
  });
};

exports.delete = async (req, res) => {
    TodoModel.remove({_id: req.params.id}, (err) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err,
            });
        }
        return res.status(200).json({
            message: "Todo deleted successfully",
        });
    });
};