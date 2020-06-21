const mongoose = require("mongoose");
const { urlencoded } = require("body-parser");

const notesSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  Title: {
    type: String,
    //required: true
    default: "Notes",
  },
  upName: {
    type: String,
    required: false,
  },
  Body: {
    type: String,
    //required: true
    default: "New Note",
  },
  Preference: {
    type: Number,
    default: 1,
    min: 1,
    max: 3,
  },
  Created: {
    type: Date,
    default: Date.now(),
  },
  Updated: {
    type: Date,
    default: Date.now(),
  },
  Comments: {
    type: Array,
    default: "Comment 1",
  },
  Likes{
  type:Number,
  default:0
},
  Image: {
    type: String,
    default:
      "https://png.pngtree.com/thumb_back/fw800/background/20190828/pngtree-dark-vector-abstract-background-image_302715.jpg",
  },
});

module.exports = mongoose.model("Notes", notesSchema);
