const express = require("express");
const { createNewTask, updateTask, getAllTasks, deleteTask, getSingleTask } = require("../../controllers/tasks");
const app = express();
// const { HasAccessToCMD } = require("../../middlewares");

// app.use(HasAccessToCMD);
app.post("/new", createNewTask);
app.put("/update", updateTask);
app.get("/all", getAllTasks)
app.delete("/delete",deleteTask)
app.get("/singletask", getSingleTask)
module.exports = app;
