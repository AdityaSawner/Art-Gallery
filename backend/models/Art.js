const mongoose = require("mongoose");

const artSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    imageURL: {
      type: String, // path to the uploaded image
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Art", artSchema);
