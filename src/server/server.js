const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { cloudinary } = require("./cloudinary");
const cors = require("cors");
const Video = require("./video");
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
const port = 3006;
app.use(cors());
mongoose
  .connect("mongodb+srv://priyam1103:priyam7035@cluster0.shnmn.mongodb.net/youtube-clone?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => console.log("connected"));

app.post("/api/upload", async (req, res) => {
  try {
    console.log(req.body.title);

    const avatar = req.body.avatar;
    const video = req.body.video;
    const avatarResponse = await cloudinary.uploader.upload(avatar, {
      upload_preset: "ml_default",
    });

    const vidoeResponse = await cloudinary.uploader.upload(video, {
      upload_preset: "ml_default",
      resource_type: "video",
    });

    const avatar_id = avatarResponse.public_id;
    const video_id = vidoeResponse.public_id;
    const video_data = new Video({
      title: req.body.title,
      desc: req.body.desc,
      avatar: avatar_id,
      video: video_id,
    });
    video_data.save();
    console.log(video_data);
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});
app.get("/videos", async (req, res) => {
  const videos = await Video.find();
  res.status(200).json({ videos });
});
app.post("/likeVideo", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const video = await Video.findById(id);
  video.liked = video.liked + 1;
  video.save();
  console.log(video);
  res.status(200).json({ likes: video.liked });
});
app.post("/countView", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const video = await Video.findById(id);
  video.views = video.views + 1;
  video.save();
  console.log(video);
  res.status(200).json({ views: video.views });
});
app.get("/views/:id", async (req, res) => {
  const id = req.params.id;

  console.log(req.params.id);
  const video = await Video.findById(id);

  res.status(200).json({ views: video.views });
});
app.post("/dislikeVideo", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const video = await Video.findById(id);
  video.dislike = video.dislike + 1;
  video.save();
  console.log(video);
  res.status(200).json({ dislikes: video.dislike });
});

app.get("/likedislike/:id", async (req, res) => {
  const id = req.params.id;

  console.log(req.params.id);
  const video = await Video.findById(id);

  res.status(200).json({ dislikes: video.dislike, likes: video.liked });
});
app.listen(port, () => {
  console.log("listening to the port: " + port);
});
