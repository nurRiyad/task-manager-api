const app = require("./../src/app");
const request = require("supertest");
const User = require("../src/models/user");

const userOne = {
  name: "jon",
  age: 50,
  email: "jon@gmail.com",
  password: "abcdefghijk",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("creating a new user account", async () => {
  await request(app)
    .post("/user")
    .send({
      name: "riyad",
      email: "sdfffsd@gmail.com",
      age: 20,
      password: "sdfsdwer324sdfs",
    })
    .expect(201);
});

test("logging in a existing user account", async () => {
  await request(app)
    .post("/user/login")
    .send({
      email: "jon@gmail.com",
      password: "abcdefghijk",
    })
    .expect(200);
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
