import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import checkVideoAvailability from "../utils/checkStreamAvailability";
import { playerState } from "../recoil/atoms";

export default function useVideoUnavailable({
  lastFunc,
  handleNext,
  handlePrevious,
  handleRandom,
}) {
  const [unavailabilityText, setUnavailabilityText] = useState(null);
  const player = useRecoilValue(playerState);

  useEffect(() => {
    if (!player.videoId) return;

    let timeoutId;
    setUnavailabilityText(null);

    async function checkCurrentStation() {
      setUnavailabilityText(null);
      const vidOk = await checkVideoAvailability(player.videoId);

      if (!vidOk) {
        setUnavailabilityText("Vid unavailable, skipping ...");
        timeoutId = setTimeout(() => {
          if (lastFunc === "prev") {
            handlePrevious();
          } else if (lastFunc === "rand") {
            handleRandom();
          } else {
            handleNext();
          }
        }, 2000);
      }
    }
    checkCurrentStation();

    return () => clearTimeout(timeoutId);
  }, [handleNext, handlePrevious, handleRandom, lastFunc, player.videoId]);

  return { unavailabilityText, setUnavailabilityText };
}
