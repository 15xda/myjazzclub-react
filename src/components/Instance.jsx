import InteractionButton from "./InteractionButton";
import YTPlayer from "./YTPlayer";
import usePlayerControls from "../hooks/usePlayerControls";
import useVolume from "../hooks/useVolume";
import { useRecoilState } from "recoil";
import { playerState } from "../recoil/atoms";
import { useState } from "react";
import useVideoData from "../hooks/useVideoData";

const Instance = () => {
  const { handleNext, handlePrevious, handleRandom } = usePlayerControls();

  const [isPlaying, setIsPlaying] = useState(false);
  const [changingVolume, setChangingVolume] = useState(null);
  const [volume, setVolume] = useVolume({ changingVolume });
  const [error, setError] = useState();
  const [status, setStatus] = useState();
  const { videoData } = useVideoData();

  const handleVolumeChange = (e) => {
    const nV = Number(e.target.value);
    setChangingVolume(nV);
    setVolume(nV);
  };

  console.log(videoData);

  return (
    <>
      <YTPlayer
        volume={volume}
        setError={setError}
        setStatus={setStatus}
        isPlaying={isPlaying}
      />

      <div className=" w-[230px] flex flex-col items-center justify-center gap-7 my-10 text-white  bg-white">
        <div className="flex flex-col w-full h-full gap-5 items-center p-3">
          <span className="bg-black p-3 w-full text-center">
            {error ? error : status}
          </span>
          <span className="custom-font text-black">
            {videoData.title || "No title"}
          </span>
          <ul className="flex flex-row w-full justify-between">
            <li>
              <InteractionButton
                onClick={handlePrevious}
                src={"/icons/prev.svg"}
              />
            </li>
            <li>
              <InteractionButton src={"/icons/next.svg"} onClick={handleNext} />
            </li>
            <li>
              <InteractionButton
                onClick={() => setIsPlaying(!isPlaying)}
                src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
              />
            </li>
            <li>
              <InteractionButton
                onClick={handleRandom}
                src={"/icons/shuffle.svg"}
              />
            </li>
          </ul>
          <div className="w-full">
            <input
              type="range"
              onChange={handleVolumeChange}
              value={volume}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Instance;
