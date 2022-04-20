const app = require("./../src/app");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../src/models/user");

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: "jon",
  age: 50,
  email: "jon@gmail.com",
  password: "abcdefghijk",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("creating a new user account", async () => {
  const response = await request(app)
    .post("/user")
    .send({
      name: "riyad",
      email: "sdfffsd@gmail.com",
      age: 50,
      password: "sdfsdwer324sdfs",
    })
    .expect(201);
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    user: {
      name: "riyad",
      email: "sdfffsd@gmail.com",
      age: 50,
    },
  });
  expect(user.password).not.toBe("sdfsdwer324sdfs");
});

test("logging in a existing user account", async () => {
  const response = await request(app)
    .post("/user/login")
    .send({
      email: "jon@gmail.com",
      password: "abcdefghijk",
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not login with false password", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "jon@gmail.com",
      password: "abcdefghijkl",
    })
    .expect(400);
});

test("Should get profile for the user", async () => {
  await request(app)
    .get("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for the user", async () => {
  await request(app)
    .get("/user/me")
    .set("Authorization", `Bearer rrr`)
    .send()
    .expect(400);
});

test("Should delete account for the user", async () => {
  await request(app)
    .delete("/user/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test("Should not delete account for the user", async () => {
  await request(app)
    .delete("/user/me")
    .set("Authorization", `Bearer sdf`)
    .send()
    .expect(400);
});
