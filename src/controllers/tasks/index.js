const { HttpStatusCode } = require("axios");
const asyncHandlers = require("../../helpers/asyncHandlers");
const taskModel = require("../../models/tasks");

const createNewTask = async (req, res) => {
  try {
    const countTask = await taskModel.countDocuments();
    console.log("req.body is", req.body);

    if (!req.body.title || !req.body.description || !req.body.createdAt) {
      return res.status(HttpStatusCode.NotFound).json({
        message: "Bad Request: Missing required fields",
      });
    }

    const newTask = {
      title: req.body.title,
      description: req.body.description,
      createdAt: req.body.createdAt,
      type: "todo",
      taskId: countTask + 1,
    };

    const task = await taskModel.create(newTask);
    res.status(200).json({
      message: "success",
      task,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const updateTask = asyncHandlers(async (req, res) => {
  const { taskId } = req.query;
  const updateTaskData = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type ?? "todo",
  };
  const updatedTask = await taskModel.findOneAndUpdate(
    { taskId: taskId },
    updateTaskData,
    { new: true }
  );

  if (!updatedTask) {
    return res.status(HttpStatusCode.NotFound).json({
      message: "Task not found",
    });
  }

  res.status(HttpStatusCode.Ok).json({
    message: "success",
    updatedTask,
  });
});


const getAllTasks = asyncHandlers(async (req, res) => {
  const allTasks = await taskModel.find({});

  const todoTasks = allTasks.filter((task) => task.type === "todo");
  const inProgressTasks = allTasks.filter((task) => task.type === "inProgress");
  const doneTasks = allTasks.filter((task) => task.type === "done");

  res.status(HttpStatusCode.Ok).json({
    message: "success",
    allTasks,
    columns: {
      todo: todoTasks,
      inProgress: inProgressTasks,
      done: doneTasks,
    },
  });
});


const deleteTask = asyncHandlers(async (req, res) => {
  const taskId = req.query.taskId
  const deletedTask = await taskModel.findOneAndDelete({ taskId: taskId });
  res.status(HttpStatusCode.Ok).json({
    message: "success",
    deletedTask
  })
});

const getSingleTask = asyncHandlers(async (req, res) => {
    const taskId = req.query.taskId;
    const singleTaskResp = await taskModel.find({
        taskId: taskId
    })
    res.status(HttpStatusCode.Ok).json({
      message: "success",
      singleTaskResp,
    });
})

module.exports = {
  createNewTask,
  updateTask,
  getAllTasks,
  getSingleTask,
  deleteTask
};
