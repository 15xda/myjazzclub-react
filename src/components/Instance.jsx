import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { useRecoilState } from "recoil";

import {
  getPlayerVolumeFromLS,
  savePlayerVolumeToLS,
} from "../utils/getPlayerVolume";
import {
  getNextStationId,
  getPreviousStationId,
  getRandomStantionId,
} from "../utils/playerControlHelpers";
import {
  getNextBkg,
  getPreviousBkg,
  getRandomBkg,
} from "../utils/backgroundControls";
import { backgroundState } from "../recoil/atoms";
import getReadableStatus from "../utils/getReadableStatus";
import checkVideoAvailability from "../utils/checkStreamAvailability";
import InteractionButton from "./InteractionButton";
import YTPlayer from "./YTPlayer";

const Instance = () => {
  const playerRef = useRef();

  const [playerIsInitialized, setPlayerIsInitialized] = useState(false);
  const [playerVolume, setPlayerVolume] = useState(() =>
    getPlayerVolumeFromLS()
  );
  const [playerVideoId, setPlayerVideoId] = useState(() =>
    getRandomStantionId()
  );
  // const [playerState, setPlayerState] = useState(-1);
  // const [videoMetaData, setVideoMetaData] = useState();
  const [backgroundImage, setBackgroundImage] = useRecoilState(backgroundState);
  const [lastFunc, setLastFunc] = useState(null);
  const [unavailablityText, setUnavailabilityText] = useState(null);

  const [playerState, setPlayerState] = useRecoilState(playerState);

  // const playerOptions = {
  //   height: "0",
  //   width: "0",
  //   playerVars: {
  //     autoplay: 1,
  //     controls: 0,
  //     playsinline: 1,
  //   },
  // };

  // const onPStateChange = (e) => {
  //   setPlayerState(e.data);
  // };

  // const onPReady = (e) => {
  //   setPlayerIsInitialized(true);
  //   setPlayerVolume(playerVolume);
  //   playerRef.current = e.target;
  //   playerRef.current.setVolume(playerVolume);
  //   setVideoMetaData(playerRef.current.getVideoData());
  // };

  const isPlayerReady = () => playerIsInitialized && playerRef.current;

  const handlePreviousStation = () => {
    if (!isPlayerReady()) return;

    const prevId = getPreviousStationId(playerVideoId);
    playerRef.current.loadVideoById(prevId);
    setPlayerVideoId(prevId);
    setBackgroundImage(getPreviousBkg(backgroundImage));
    setLastFunc("prev");
  };

  const handleNextStation = () => {
    if (!isPlayerReady()) return;

    const nextId = getNextStationId(playerVideoId);
    playerRef.current.loadVideoById(nextId);
    setPlayerVideoId(nextId);
    setBackgroundImage(getNextBkg(backgroundImage));
    setLastFunc("next");
  };

  const handlePlayPauseStream = () => {
    if (!isPlayerReady()) return;

    if (playerState === 1) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleRandomStation = () => {
    if (!isPlayerReady()) return;

    const randId = getRandomStantionId(playerVideoId);
    playerRef.current.loadVideoById(randId);
    setPlayerVideoId(randId);
    setBackgroundImage(getRandomBkg());
    setLastFunc("rand");
  };

  const handleVolumeChange = (e) => {
    const volume = parseInt(e.target.value, 10);
    if (playerIsInitialized && playerRef.current) {
      playerRef.current.setVolume(volume);
      savePlayerVolumeToLS(volume);
      setPlayerVolume(volume);
    }
  };

  // Check if YouTube Stream is unavailable and perform last player interaction.

  useEffect(() => {
    async function checkCurrentStation() {
      const vidOk = await checkVideoAvailability(playerVideoId);

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
  }, [playerVideoId]);

  return (
    <>
      <YTPlayer />

      <div className=" w-[230px] flex flex-col items-center justify-center gap-7 my-10 text-white  bg-white">
        <div className="flex flex-col w-full h-full gap-5 items-center p-3">
          <span className="bg-black p-3 w-full text-center">
            {unavailablityText
              ? unavailablityText
              : `${getReadableStatus(playerState)}`}
          </span>
          <span className="custom-font text-black">
            {playerRef.current && playerState}
          </span>
          <ul className="flex flex-row w-full justify-between">
            <li>
              <InteractionButton
                onClick={handlePreviousStation}
                src={"/icons/prev.svg"}
              />
            </li>
            <li>
              <InteractionButton
                src={"/icons/next.svg"}
                onClick={handleNextStation}
              />
            </li>
            <li>
              <InteractionButton
                onClick={handlePlayPauseStream}
                src={playerState === 1 ? "/icons/pause.svg" : "/icons/play.svg"}
              />
            </li>
            <li>
              <InteractionButton
                onClick={handleRandomStation}
                src={"/icons/shuffle.svg"}
              />
            </li>
          </ul>
          <div className="w-full">
            <input
              type="range"
              onChange={handleVolumeChange}
              value={playerVolume}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Instance;
