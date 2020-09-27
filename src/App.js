import React from "react";
import { Router } from "@reach/router";
import Upload from "./components/Upload";
import Playvideo from "./components/Playvideo";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div>
      <Navbar />
      <Router style={{}}>
        <Home path="/" />
        <Upload path="upload" />
        <Playvideo path="playvideo" />
      </Router>
    </div>
  );
}

export default App;
