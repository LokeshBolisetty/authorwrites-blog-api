const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrpyt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

router.post("/", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Authorization failed",
        });
      }
      bcrpyt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Authorization Failed" });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            "password",
            {
              expiresIn: "2h",
            }
          );
          return res.status(200).json({
            message: "Authorization successful",
            token: token,
          });
        }
        res.status(401).json({
          message: "Authorization failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
