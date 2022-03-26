require("./db/mongoose");
const express = require("express");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is on port " + port);
});
