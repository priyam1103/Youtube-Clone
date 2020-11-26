import React, { useState } from "react";

import { navigate } from "@reach/router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faFileVideo } from "@fortawesome/free-solid-svg-icons";
export default function Upload() {
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [percent, setPercent] = React.useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [previewavatarSource, setavatarPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [selectedavatarFile, setavatarSelectedFile] = useState();
  const [videoloading, setvideoLoading] = useState(false);
  const [avatarLoading, setavatarLoading] = useState(false);
  const [error, setError] = useState("");
  const previewFile = (file) => {
    setvideoLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setvideoLoading(false);
      setPreviewSource(reader.result);
    };
  };
  const previewavatarFile = (file) => {
    setavatarLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setavatarLoading(false);
      setavatarPreviewSource(reader.result);
    };
  };
  const handleSend = (e) => {
    e.preventDefault();
    const data = {
      video: "",
      avatar: "",
    };

    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      data.video = reader.result;
      reader.readAsDataURL(selectedavatarFile);
      reader.onloadend = () => {
        data.avatar = reader.result;
        if (
          data.avatar === "" ||
          data.video === "" ||
          name === "" ||
          desc === ""
        ) {
          console.log("error");
          setError("Please provide all the requirements");
        } else uploadImage(data);
      };
    };

    reader.onerror = () => {
      console.error("Error!");
    };
  };

  const uploadImage = async (data) => {
    const options = {
      onUploadProgress: (ProgressEvent) => {
        const { loaded, total } = ProgressEvent;
        setPercent(Math.floor((loaded * 100) / total));

        console.log(`${loaded}kb of ${total} | ${percent}`);
      },
    };

    const dataa = {
      avatar: data.avatar,
      video: data.video,
      title: name,
      desc: desc,
    };

    try {
      axios
        .post("https://youtube-clone-priyam.herokuapp.com/api/upload", dataa, options)
        .then((res) => {
          console.log(res);
          setPreviewSource("");
          setavatarPreviewSource("");
          setSelectedFile("");
          setPercent(null);
          setavatarSelectedFile("");
          setName("");
          setDesc("");
          setError("");
          navigate("/");
        });
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    }
  };
  return (
    <div className="upload">
      <div className="form">
        <form action="#">
          {previewavatarSource ? (
            <img src={previewavatarSource} className="avatar" />
          ) : avatarLoading ? (
            <div class="loader"></div>
          ) : (
            <label htmlFor="fille" style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faUserCircle} size="3x"></FontAwesomeIcon>
            </label>
          )}

          <input
            type="file"
            hidden
            accept=".png"
            id="fille"
            onChange={(e) => {
              const files = e.target.files[0];
              previewavatarFile(files);
              setavatarSelectedFile(files);
            }}
          ></input>
          <div className="form">
            <input
              placeholder="Title"
              type="text"
              id="name"
              className="name-input"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <input
              placeholder="Description"
              type="text"
              id="desc"
              className="name-input"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></input>

            <input
              type="file"
              hidden
              id="file"
              accept=".mp4"
              onChange={(e) => {
                const files = e.target.files[0];
                previewFile(files);
                setSelectedFile(files);
              }}
            ></input>
            {error.length > 0 && <p className="error">{error}</p>}
            <button onClick={(e) => handleSend(e)} className="button">
              {" "}
              Upload
            </button>
          </div>
        </form>
        {percent != null ? <div class="loader"></div> : null}
      </div>
      <div class="upload-video">
        {previewSource ? (
          <video src={previewSource} className="video-demo" autoPlay></video>
        ) : videoloading ? (
          <div class="loader"></div>
        ) : (
          <label htmlFor="file" className="file">
            <FontAwesomeIcon icon={faFileVideo} size="3x"></FontAwesomeIcon>
            <span style={{ marginTop: "10px" }}>Select video</span>
          </label>
        )}
      </div>
    </div>
  );
}
