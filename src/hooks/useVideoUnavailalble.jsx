import { useEffect, useState } from "react";
import checkVideoAvailability from "../utils/checkStreamAvailability";
import { useRecoilValue } from "recoil";

export default function useVideoUnavailable({
  lastFunc,
  handleNextStation,
  handlePreviousStation,
  handleRandomStation,
}) {
  const [unavailablityText, setUnavailabilityText] = useState();
  const { playerState } = useRecoilValue(playerState);

  useEffect(() => {
    async function checkCurrentStation() {
      const vidOk = await checkVideoAvailability(playerState.videoId);

      if (!vidOk) {
        setUnavailabilityText("Vid unavailable, skipping ...");
        setTimeout(() => {
          if (lastFunc === "prev") {
            handlePreviousStation();
          } else if (lastFunc === "rand") {
            handleRandomStation();
          } else {
            handleNextStation();
          }
        }, 2000);
      }
    }
    checkCurrentStation();
    setUnavailabilityText(null);
  }, [
    handleNextStation,
    handlePreviousStation,
    handleRandomStation,
    lastFunc,
    playerState.videoId,
  ]);

  return { unavailablityText };
}
