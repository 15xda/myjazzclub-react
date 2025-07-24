import { atom } from "recoil";
import { getRandomBkg } from "../utils/backgroundControls";
import { getRandomStationId } from "../utils/playerControlHelpers";

const backgroundState = atom({
  key: "background",
  default: getRandomBkg(),
});

const playerState = atom({
  key: "playerState",
  default: {
    videoId: getRandomStationId(),
    isPlaying: true,
    isInitialized: false,
    volume: 0,
    videoMetaData: {},
    playerInstance: null,
  },
});

const isPlayingState = atom({
  key: "isPlaying",
  default: false,
});

export { playerState, backgroundState, isPlayingState };
