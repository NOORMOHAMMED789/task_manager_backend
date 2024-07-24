const { default: mongoose } = require("mongoose");

const tasksSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    taskId: {
        type: Number,
        required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("tasks", tasksSchema);
module.exports = taskModel;
