import React, { useState, useRef } from "react";
import Home from "./Home";
import axios from "axios";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
export default function Playvideo({ location }) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const id = location.state._id;
  const [views, setViews] = useState(location.state.views);
  const [viewCounted, setViewCounted] = useState(false);
  const vid = useRef(null);

  React.useEffect(() => {
    console.log(id);
    axios.get(`http://localhost:3006/likedislike/${id}`).then((res) => {
      console.log(res.data);
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    });
  }, []);

  const handleLike = (id) => {
    axios.post("http://localhost:3006/likeVideo", { id: id }).then((res) => {
      setLikes(res.data.likes);
    });
  };
  const handleDisLike = (id) => {
    axios.post("http://localhost:3006/dislikeVideo", { id: id }).then((res) => {
      setDislikes(res.data.dislikes);
    });
  };
  //   React.useEffect(() => {
  function handleView(id) {
    // console.log(vid.current.currentTime);
    if (!viewCounted) {
      if ((vid.current.duration * 50) / 100 < vid.current.currentTime) {
        setViewCounted(true);
        axios
          .post("http://localhost:3006/countView", { id: id })
          .then((res) => {
            setViews(res.data.views);
          });
      }
    }
  }
  //   }, []);
  return (
    <div className="playv">
      <div>
        <video
          ref={vid}
          src={`https://res.cloudinary.com/dcabs2hat/video/upload/${location.state.video}.mp4`}
          poster={`https://res.cloudinary.com/dcabs2hat/image/upload/${location.state.avatar}.png`}
          autoPlay
          onTimeUpdate={() => handleView(location.state._id)}
          controls
          className="fullvideo"
        ></video>

        <div className="play-details">
          <div>
            <p>
              {location.state.title} | {location.state.desc}{" "}
            </p>
          </div>

          <div className="vedio-int">
            <p className="play-views-date">
              {" "}
              {views} views |{" "}
              {location.state.createdAt.toString().substr(0, 10)}
            </p>
            <div className="button-play-screen">
              <div className="like-dislike-button">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  size="2x"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleLike(location.state._id)}
                />
                <p className="like-text">{likes}</p>
              </div>
              <div className="like-dislike-button">
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  size="2x"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDisLike(location.state._id)}
                />

                <p className="like-text">{dislikes}</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="hr" />
        <img
          src={`https://res.cloudinary.com/dcabs2hat/image/upload/${location.state.avatar}.png`}
          className="play-avatar"
        ></img>
      </div>
      <div className="videolist">
        <Home play={true} />
      </div>
    </div>
  );
}
