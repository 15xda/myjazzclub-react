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

  const onPStateChange = (e) => {
    setPlayer((prev) => ({
      ...prev,
      playerStateCode: e.data,
    }));
  };

  useEffect(() => {
    if (playerRef.current && player.isInitialized) {
      playerRef.current.loadVideoById(player.videoId);
    }
  }, [player.videoId, player.isInitialized]);

  useEffect(() => {
    if (playerRef.current && player.isInitialized) {
      playerRef.current.setVolume(volume);
    }
  }, [player.isInitialized, volume]);

  useEffect(() => {
    if (playerRef.current && player.isInitialized) {
      const stateCode = player.playerStateCode;

      if (stateCode === 1) {
        playerRef.current.playVideo();
      } else if (stateCode === 2) {
        playerRef.current.pauseVideo();
      }
    }
  }, [player.isInitialized, player.playerStateCode]);

  return (
    <YouTube
      onReady={onPReady}
      onStateChange={onPStateChange}
      opts={playerOptions}
      videoId={player.videoId}
    />
  );
}
