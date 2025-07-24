import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import { useRecoilState } from "recoil";

import { isPlayingState, playerState } from "../recoil/atoms";
import { useRef } from "react";
import usePlayerControls from "../hooks/usePlayerControls";

export default function YTPlayer({
  volume,
  error,
  setError,
  setStatus,
  isPlaying,
}) {
  const [player, setPlayer] = useRecoilState(playerState);
  const playerRef = useRef();
  const { handleRandom } = usePlayerControls();
  console.log(player.videoId);

  const handleError = () => {
    setError("Unavailable, skipping...");
    setTimeout(() => {
      handleRandom();
      setError(null);
    }, 2000);
  };

  return (
    <ReactPlayer
      src={`https://www.youtube.com/watch?v=${player.videoId}`}
      ref={playerRef}
      playing={isPlaying}
      paused={!isPlaying}
      volume={volume / 100}
      onError={handleError}
      onPlay={() => setStatus("playing")}
      onPause={() => setStatus("paused")}
      onBuffer={() => setStatus("buffering")}
      onEnded={() => setStatus("ended")}
      width="0"
      height="0"
      style={{ display: "none" }}
    />
  );
}
