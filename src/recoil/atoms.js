import { atom } from "recoil";
import { getRandomBkg } from "../utils/backgroundControls";

const backgroundState = atom({
    key: 'background', 
    default: getRandomBkg(),
})

export {backgroundState}