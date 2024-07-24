const express = require("express");
const { createNewTask, updateTask, getAllTasks, deleteTask } = require("../../controllers/tasks");
const app = express();
// const { HasAccessToCMD } = require("../../middlewares");

// app.use(HasAccessToCMD);
app.post("/new", createNewTask);
app.put("/update", updateTask);
app.get("/all", getAllTasks)
app.delete("/delete",deleteTask)
module.exports = app;
