const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const notes = require("../models/notes");

router.patch("/:noteid", (req, res, next) => {
  const id = req.params.noteid;
  /*const updateops = {};
  for (const ops of req.body) {
    updateops[ops.propName] = ops.value;
  }*/

  notes
    .findOneAndUpdate(
      { _id: id },
      {
        Likes: req.body.Likes,
      }
    )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({ messsage: "Blog updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "This ID does not exist",
      });
    });
});

module.exports = router;
