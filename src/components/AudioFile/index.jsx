import React, { useRef, useCallback } from "react";
import { IoPlay, FaPause } from "../../assets/icons";
import { AudioContainer, AudioManager } from "./style";
import { resizeLastMessage } from "../../services/user";
import { useAudio } from "../../hooks";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
};

function AudioFile({ audioData }) {
  const { url, name } = audioData;

  const audioRef = useRef(null);
  const rangeRef = useRef(null);

  const { playing, duration, currentTime, togglePlayPause, seekAudio } =
    useAudio(audioRef);

  const handleRangeChange = useCallback(
    (e) => {
      const newTime = Number(e.target.value);
      seekAudio(newTime);
    },
    [seekAudio]
  );

  return (
    <>
      <audio ref={audioRef} style={{ display: "none" }}>
        <source src={url} type="audio/ogg" />
        Your browser does not support the audio element.
      </audio>
      <AudioContainer>
        <AudioManager type="button" onClick={togglePlayPause}>
          {playing ? <FaPause /> : <IoPlay />}
        </AudioManager>
        <div>
          <input
            ref={rangeRef}
            type="range"
            value={currentTime}
            max={duration}
            onChange={handleRangeChange}
          />
          <span>
            <p>{resizeLastMessage(name)}</p>
            <p>
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </span>
        </div>
      </AudioContainer>
    </>
  );
}

export default React.memo(AudioFile);
