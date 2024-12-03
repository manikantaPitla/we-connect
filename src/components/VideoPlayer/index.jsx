import React from "react";

function VideoPlayer({ videoData }) {
  return (
    <video style={{ width: "100%" }} controls>
      <source src={videoData} />
    </video>
  );
}

export default VideoPlayer;
