const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const notes = require("../models/notes");

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const newC = req.body.Comments;
  let commenter;
  notes
    .findById(id)
    .select("Comments")
    .exec()
    .then((doc) => {
      console.log("doc=" + doc);
      commenter = doc.Comments;
      console.log("commenter=" + commenter);
      commenter.push(newC);

      notes
        .update({ _id: id }, { Comments: commenter })
        .exec()
        .then((result) => {
          console.log(result);
          res.status(200).json({ message: "entry updated" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;

/*
router.post("/:id", (req, res, next) => {
  const id = req.params.id;
  const newC = req.body.Comments;
  let commenter = [];
  notes
    .findById(id)
    .exec()
    .then((result) => {
      console.log(result.Comments);
      res.status(200).json(result.Comments);
      updateOne({_id:id},{result.Comments = result.Comments.push(newC)})
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Was not able to post your comment to the comments list",
      });
    });
});

router.post("/:id", (req, res, next) => {
  const id = req.params.id;
  const newC = req.body.Comments;
  let commenter;
  notes
    .findById(id)
    .select("Comments")
    .exec()
    .then((doc) => {
      console.log("doc=" + doc);
      commenter = doc.Comments;
      console.log("commenter=" + commenter);
      commenter.push(newC);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Was not able to post your comment to the comments list",
      });
    });
  console.log("newC=" + newC);

  console.log("commenter=" + commenter);
  notes.findByIdAndUpdate(
    id,
    { Comments: Comments.push(newC) },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(result);
        res.status(200).json(result);
      }
    }
  );
});
*/
module.exports = router;
