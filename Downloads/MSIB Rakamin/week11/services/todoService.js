const todoRepository = require("../repositories/todoRepository");

const getAllTodoList = async () => {
  return await todoRepository.getAllTodoList();
};

const getTodoListById = async (id) => {
  return await todoRepository.getTodoListById(id);
};

const createTodo = async (todoData) => {
  return await todoRepository.createTodo(todoData);
};

const deleteTodoById = async (id) => {
  return await todoRepository.deleteTodoById(id);
};

module.exports = {
  getAllTodoList,
  getTodoListById,
  createTodo,
  deleteTodoById,
};
