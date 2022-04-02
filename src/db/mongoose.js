const mongoose = require("mongoose");

//Connect to the mongodb database
mongoose.connect(process.env.MONGOD_URL);
