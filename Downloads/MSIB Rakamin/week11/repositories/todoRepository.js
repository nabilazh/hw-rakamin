const Todo = require("../models/todo");

const getAllTodoList = async () => {
  return await Todo.findAll();
};

const getTodoListById = async (id) => {
  return await Todo.findByPk(id);
};

const createTodo = async (todoData) => {
  return await Todo.create(todoData);
};

const deleteTodoById = async (id) => {
  return await Todo.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getAllTodoList,
  getTodoListById,
  createTodo,
  deleteTodoById,
};
