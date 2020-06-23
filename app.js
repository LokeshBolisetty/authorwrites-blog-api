const express = require("express");
const app = new express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./Routes/noter");
const nameRoutes = require("./Routes/name");
const userRoutes = require("./Routes/user");
const commentRoutes = require("./Routes/comments");
const loginRoute = require("./Routes/login");
const LikeRoutes = require("./Routes/likes");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://Lokesh:Stbemhs@blogdata-y4ixx.mongodb.net/BlogData?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Methods", "PUT, PATCH, DELETE, GET, POST");
    return res.status(200).json({});
  }
  next();
});

app.use("/", router);
app.use("/names", nameRoutes);
app.use("/comments", commentRoutes);

app.use("/login", loginRoute);
app.use("/likes", LikeRoutes);

module.exports = app;
