const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

taskSchema.pre("save", async function (next) {
  const task = this;
  if (task.isModified("description")) {
    task.complete = false;
  }
  next();
});

//Task model for creating new task
const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;
