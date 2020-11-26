import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "@reach/router";

export default function Home({ play }) {
  const [data, setData] = useState([]);
  const [mainndata, setMainData] = useState([]);
  const vid = useRef([]);
  vid.current = [];
  React.useEffect(() => {
  
    axios.get("https://youtube-clone-priyam.herokuapp.com/videos").then((res) => {
      setData(res.data.videos);
      setMainData(res.data.videos);
    })
      .catch((err) => {
      console.log(err)
    })
  }, []);
  const handleMouse = (e) => {
    vid.current[e].play();
  };
  const handleMouseOut = (e) => {
    vid.current[e].pause();
  };

  const makeRef = (el) => {
    if (el && !vid.current.includes(el)) {
      vid.current.push(el);
    }
  };
  const handleChange = (e) => {
    if (e.target.value === "") {
      setData(mainndata);
    } else if (e.target.value.length > 3) {
      const search = e.target.value;
      const filteredData = mainndata.filter((index) =>
        index.title.toLowerCase().includes(search)
      );
      setData(filteredData);
    }
  };
  return (
    <div style={{ margin: "3%" }}>
      <div>
        <input
          className="searchbar"
          placeholder="Search"
          onChange={(e) => handleChange(e)}
          name="search"
        ></input>
      </div>
      {data ? (
        <>
          {!play ? (
            <div style={{}} className="videos">
              {Object.keys(data).map((s) => (
                <div
                  key={data[s].title}
                  style={{ width: "300px" }}
                  className="container"
                >
                  <Link to="/playvideo" state={data[s]}>
                    {" "}
                    <video
                      ref={makeRef}
                      src={`https://res.cloudinary.com/${process.env.REACT_APP_cloud_name}/video/upload/${data[s].video}.mp4`}
                      muted
                      onMouseOver={(e) => handleMouse(s)}
                      onMouseOut={(e) => handleMouseOut(s)}
                      className="video"
                    ></video>
                  </Link>
                  <div className="vid-detail">
                    <img
                      src={`https://res.cloudinary.com/${process.env.REACT_APP_cloud_name}/image/upload/${data[s].avatar}.png`}
                      className="avatar"
                    ></img>
                    <div className="details">
                      <p className="video-title">{data[s].title}</p>
                      <p className="video-desc">{data[s].desc}</p>
                      <p className="playlist-video-views">
                        {data[s].views} views |{" "}
                        {data[s].createdAt.toString().substr(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: "50px" }} className="">
              {Object.keys(data).map((s) => (
                <div
                  key={data[s].title}
                  style={{ width: "400px" }}
                  className="playlist-container"
                >
                  <Link to="/playvideo" state={data[s]}>
                    {" "}
                    <video
                      ref={makeRef}
                      src={`https://res.cloudinary.com/dcabs2hat/video/upload/${data[s].video}.mp4`}
                      className="playlist-video"
                    ></video>
                  </Link>
                  <div className="playlist-vid-detail">
                    <div className="playlist-details">
                      <p className="playlist-video-title">{data[s].title}</p>
                      <p className="playlist-video-views">
                        {data[s].views} views |{" "}
                        {data[s].createdAt.toString().substr(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}
