const { HttpStatusCode } = require("axios");
const asyncHandlers = require("../../helpers/asyncHandlers");
const taskModel = require("../../models/tasks");

const createNewTask = asyncHandlers(async (req, res) => {
  const countTask = await taskModel.countDocuments();
  const newTask = {
    title: "todo 1",
    description: "todo 1 description",
    type: "todo",
    taskId: countTask + 1,
  };
  const task = await taskModel.create(newTask);
  res.status(HttpStatusCode.Ok).json({
    message: "success",
    task,
  });
});

const updateTask = asyncHandlers(async (req, res) => {
  const taskId = 1;
  const updateTaskData = {
    title: "todo 2",
    description: "todo 2 description",
    type: "todo",
  };
  const updatedTask = await taskModel.findOneAndUpdate(
    {
      taskId: taskId,
    },
    updateTaskData
  );
  res.status(HttpStatusCode.Ok).json({
    message: "success",
  });
});

const getAllTasks = asyncHandlers(async (req, res) => {
  const allTasks = await taskModel.find({});
  res.status(HttpStatusCode.Ok).json({
    message: "success",
    allTasks,
  });
});

const deleteTask = asyncHandlers(async (req, res) => {
  const taskId = 1;
  const deletedTask = await taskModel.findOneAndDelete({ taskId: taskId });
  res.status(HttpStatusCode.Ok).json({
    message: "success",
    deletedTask
  })
});

module.exports = {
  createNewTask,
  updateTask,
  getAllTasks,
  deleteTask
};
