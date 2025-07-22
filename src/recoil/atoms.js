import { atom } from "recoil";
import { getRandomBkg } from "../utils/backgroundControls";
import { getRandomStantionId } from "../utils/playerControlHelpers";

const backgroundState = atom({
  key: "background",
  default: getRandomBkg(),
});

const playerState = atom({
  key: "playerState",
  default: {
    videoId: getRandomStantionId(),
    playerStateCode: -1,
    isInitialized: false,
    volume: 0,
    videoMetaData: {},
    playerInstance: null,
  },
});

export { playerState, backgroundState };
