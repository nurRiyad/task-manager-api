const express = require("express");
const User = require("../models/user");
const auth = require("./../middleware/auth");
const router = new express.Router();
const multer = require("multer");
const { deleteMsg, welcomeMsg } = require("./../emails/account");
const sharp = require("sharp");

//Create A new User
router.post("/user", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    welcomeMsg(user.name, user.email);
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
    deleteMsg(req.user.name, req.user.email);
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//Upload your avatar
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload only image"));
    } else {
      cb(undefined, true);
    }
  },
});
router.post(
  "/user/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const buffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();
      req.user.avatar = buffer;
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(400).send(error);
    }
  },
  (error, req, res, next) => {
    res
      .status(400)
      .send({ error: "Pease Upload Image type file with size <1m Size" });
  }
);

//Avatar delete route
router.delete("/user/me/avatar", auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(400).send(error);
  }
});

//Get Avatar By Id
router.get("/user/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
