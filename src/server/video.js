const mongoose = require("mongoose");
const { Schema } = mongoose;
const video = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    liked: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("video", video);
module.exports = Video;
