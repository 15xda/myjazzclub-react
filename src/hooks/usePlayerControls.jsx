import { useRecoilState } from "recoil";
import { playerState } from "../recoil/atoms";
import {
  getNextStationId,
  getPreviousStationId,
  getRandomStationId,
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
    console.log("Handle Next called");

    setLastFunc("next");
    setPlayer((prev) => ({
      ...prev,
      videoId: nextId,
    }));
  };

  const handleRandom = async () => {
    const randomId = getRandomStationId();

    setLastFunc("rand");
    setPlayer((prev) => ({
      ...prev,
      videoId: randomId,
    }));
  };

  return {
    handleNext,
    handlePrevious,
    handleRandom,
    lastFunc,
  };
}
