import YouTube from "react-youtube";
import { useRecoilState } from "recoil";

import { playerState } from "../recoil/atoms";
import { useRef } from "react";

const playerOptions = {
  height: "0",
  width: "0",
  playerVars: {
    autoplay: 1,
    controls: 0,
    playsinline: 1,
  },
};

export default function YTPlayer({ volume }) {
  const [, setPlayerState] = useRecoilState(playerState);
  const playerRef = useRef();

  const onPStateChange = (e) => {
    setPlayerState((prev) => ({ ...prev, playerStateCode: e.data }));
  };

  const onPReady = (e) => {
    playerRef.current = e.target;
    playerRef.current.setVolume(volume);

    setPlayerState((prev) => ({
      ...prev,
      isInitialized: true,
      volume,
      videoMetaData: playerRef.current.getVideoData(),
    }));

    // setPlayerIsInitialized(true);
    // setPlayerVolume(playerVolume);
    // playerRef.current = e.target
    // playerRef.current.setVolume(playerVolume);
    // setVideoMetaData(playerRef.current.getVideoData());
  };

  return (
    <YouTube
      onReady={onPReady}
      onStateChange={onPStateChange}
      opts={playerOptions}
    />
  );
}
