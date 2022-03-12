const mongoose = require("mongoose");

//Task model for creating new task
const Task = mongoose.model("tasks", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
});

module.exports = Task;
