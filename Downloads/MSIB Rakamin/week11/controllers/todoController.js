const todoService = require("../services/todoService");

const getTodo = async (req, res) => {
  try {
    const todos = await todoService.getAllTodoList();
    res.json({
      data: todos,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTodoByID = async (req, res) => {
  try {
    const todoID = parseInt(req.params.id);
    const todo = await todoService.getTodoListById(todoID);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({
      data: todo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const todoData = req.body;
    const createdTodo = await todoService.createTodo(todoData);
    res.status(201).json({
      message: "Todo created successfully",
      data: createdTodo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editTodo = async (req, res) => {
  try {
    const todoID = parseInt(req.params.id);
    const todoData = req.body;

    if (!todoData) {
      return res.status(400).json({ error: "Fields are missing" });
    }

    const updatedTodo = await todoService.editTodo(todoID, todoData);

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoID = parseInt(req.params.id);
    const deletedTodo = await todoService.deleteTodoById(todoID);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTodo,
  getTodoByID,
  createTodo,
  editTodo,
  deleteTodo,
};
