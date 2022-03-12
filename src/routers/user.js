const express = require("express");
const User = require("../model/user");
const router = new express.Router();

//Create A new User
router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get All available user
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Get A specific user by id
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send();
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update A specific user
router.patch("/user/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "email", "age", "password"];
  const isValidUpdate = updates.every((update) => {
    return allowUpdates.includes(update);
  });
  if (!isValidUpdate) {
    res.status(400).send({ error: "Invalid updates!" });
  } else {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) {
        res.status(404).send();
      } else {
        res.send(user);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
});

//Delete a specific user
router.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).send();
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
