const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const auth = require("../middleware/auth");

//creating a new task
router.post("/task", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Get all the created tasks
router.get("/tasks", auth, async (req, res) => {
  try {
    await req.user.populate("tasks");
    res.send(req.user.tasks);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Get a specific task by task id
router.get("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send();
    } else {
      res.send(task);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//Update a specific task
router.patch("/task/:id", auth, async (req, res) => {
  const updateParams = Object.keys(req.body);
  const availableKey = ["description", "complete"];
  const isValid = updateParams.every((update) => {
    return availableKey.includes(update);
  });
  if (!isValid) {
    res.status(400).send({ error: "Not Valid Update operation" });
  } else {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });
      if (!task) {
        res.status(404).send();
      } else {
        updateParams.forEach((key) => (task[key] = req.body[key]));
        await task.save();
        res.send(task);
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

//Delete a specific task
router.delete("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      res.status(404).send({ error: "No task found to delete" });
    } else {
      res.send(task);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
