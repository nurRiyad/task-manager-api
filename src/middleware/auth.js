const jwt = require("jsonwebtoken");
const User = require("./../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode._id, "tokens.token": token });
    if (!user) {
      throw new Error();
    } else {
      req.user = user;
      req.token = token;
      next();
    }
  } catch (error) {
    res.status(400).send({ error: "Please Authorize" });
  }
};

module.exports = auth;
