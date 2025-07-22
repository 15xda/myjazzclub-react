import YouTube from "react-youtube";
import { useRecoilState } from "recoil";

import { playerState } from "../recoil/atoms";
import { useRef, useEffect } from "react";

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
  const [player, setPlayer] = useRecoilState(playerState);
  const playerRef = useRef();

  const onPStateChange = (e) => {
    setPlayer((prev) => ({ ...prev, playerStateCode: e.data }));
  };

  const onPReady = (e) => {
    playerRef.current = e.target;
    playerRef.current.setVolume(volume);

    setPlayer((prev) => ({
      ...prev,
      isInitialized: true,
      volume,
      videoMetaData: playerRef.current.getVideoData(),
    }));
  };

  useEffect(() => {
    if (playerRef.current && player.isInitialized) {
      playerRef.current.loadVideoById(player.videoId);
    }
  }, [player.videoId, player.isInitialized]);

  return (
    <YouTube
      onReady={onPReady}
      onStateChange={onPStateChange}
      opts={playerOptions}
      videoId={player.videoId}
    />
  );
}
