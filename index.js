const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { mongoose } = require("mongoose");
const UserModel = require("./model/userSchema");
const userRouter = require("./router/userRouter");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use("/api", userRouter);

const port = process.env.PORT || 8000;
const url = process.env.MONGO_DB_SECRET_KEY;
const server = async () => {
  try {
    await mongoose.connect(url).then(() => {
      console.log("DB connected");
    });
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  } catch (error) {
    console.log(error);
  }
};

server();
