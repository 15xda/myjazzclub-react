import { useRecoilState } from "recoil";
import { playerState } from "../recoil/atoms";
import {
  getNextStationId,
  getPreviousStationId,
  getRandomStantionId,
} from "../utils/playerControlHelpers";
import { useState } from "react";

export default function usePlayerControls() {
  const [player, setPlayer] = useRecoilState(playerState);
  const [lastFunc, setLastFunc] = useState();

  const handlePrevious = () => {
    const prevId = getPreviousStationId(player.videoId);

    setLastFunc("prev");
    setPlayer((prev) => ({
      ...prev,
      videoId: prevId,
    }));
  };

  const handleNext = () => {
    const nextId = getNextStationId(player.videoId);

    setLastFunc("next");
    setPlayer((prev) => ({
      ...prev,
      videoId: nextId,
    }));
  };

  const handleRandom = async () => {
    const randomId = getRandomStantionId();

    setLastFunc("rand");
    setPlayer((prev) => ({
      ...prev,
      videoId: randomId,
    }));
  };

  const handlePlayPause = () => {
    if (!player.isInitialized) return;

    if (player.playerStateCode === 1) {
      setPlayer((prev) => ({ ...prev, playerStateCode: 2 }));
    } else {
      setPlayer((prev) => ({ ...prev, playerStateCode: 1 }));
    }
  };

  return {
    handleNext,
    handlePrevious,
    handleRandom,
    handlePlayPause,
    lastFunc,
  };
}
