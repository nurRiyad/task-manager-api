const express = require("express");
const User = require("../models/user");
const auth = require("./../middleware/auth");
const router = new express.Router();

//Create A new User
router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.jwtAuthGenerate();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

//Login as a user
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);
    const token = await user.jwtAuthGenerate();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//Logout from One device
router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (element) => element.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
});

//Logout From all device
router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
});

//Read Your loggedIn user profile
router.get("/user/me", auth, async (req, res) => {
  res.send(req.user);
});

// Update your user profile
router.patch("/user/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpdates = ["name", "email", "age", "password"];
  const isValidUpdate = updates.every((update) => {
    return allowUpdates.includes(update);
  });
  if (!isValidUpdate) {
    res.status(400).send({ error: "Invalid updates!" });
  } else {
    try {
      updates.forEach((key) => (req.user[key] = req.body[key]));
      await req.user.save();
      res.send(req.user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
});

//Delete your login profile user
router.delete("/user/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
