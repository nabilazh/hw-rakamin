const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", todoController.getTodo);
router.get("/:id", todoController.getTodoByID);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.editTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
