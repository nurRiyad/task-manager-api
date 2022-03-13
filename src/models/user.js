const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email Is not valid");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 10) {
        throw new Error("Must be 10+ years old to create a user account");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Password should not contain word 'password'");
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//Add jwtAuth function to user instance
userSchema.methods.jwtAuthGenerate = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "riyad");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//Filter the send object ot trim down valuable data
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};

//Compare and return the user
userSchema.statics.findUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Unable to login");
    } else {
      return user;
    }
  }
};

//Hash password before saving into database
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//user model to create a new user account
const User = mongoose.model("users", userSchema);

module.exports = User;
