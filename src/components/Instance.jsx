import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRecoilState, useRecoilValue } from 'recoil';
import { 
  faBackward, 
  faForward, 
  faPause,
  faRandom,
  faPlay
 } from '@fortawesome/free-solid-svg-icons';


import { getPlayerVolumeFromLS, savePlayerVolumeToLS } from '../utils/getPlayerVolume';
import { getNextStationId, getPreviousStationId, getRandomStantionId} from '../utils/playerControles';
import { getNextBkg, getPreviousBkg, getRandomBkg } from '../utils/backgroundControls';
import { backgroundState } from '../recoil/atoms';
import getReadableStatus from '../utils/getReadableStatus';
import checkVideoAvailability from '../utils/checkStreamAvailability';
import InteractionButton from './InteractionButton';

const Instance = () => {
  const playerRef = useRef();

  const [playerIsInitialized, setPlayerIsInitialized] = useState(false);
  const [playerVolume, setPlayerVolume] = useState(() => getPlayerVolumeFromLS());
  const [playerVideoId, setPlayerVideoId] = useState(() => getRandomStantionId());
  const [playerState, setPlayerState] = useState(-1);
  const [videoMetaData, setVideoMetaData] = useState();
  const [backgroundImage, setBackgroundImage] = useRecoilState(backgroundState);
  const [lastFunc, setLastFunc] = useState(null);
  const [unavailablityText, setUnavailabilityText] = useState(null);
  
  const playerOptions = {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 1,
        controls: 0,
        playsinline: 1,
      },
  };

  const onPStateChange = (e) => {
      setPlayerState(e.data);      
  }

  const onPReady = (e) => {
    setPlayerIsInitialized(true);
    setPlayerVolume(playerVolume)
    playerRef.current = e.target;
    playerRef.current.setVolume(playerVolume);
    setVideoMetaData(playerRef.current.getVideoData());
  }
  

  const handlePreviousStation = () => {
    if (playerIsInitialized && playerRef.current) {
      const prevId = getPreviousStationId(playerVideoId);
      playerRef.current.loadVideoById(prevId);
      setPlayerVideoId(prevId);
      setBackgroundImage(getPreviousBkg(backgroundImage));
      setLastFunc('prev');
    }
  }

  

  const handleNextStation = () => {

    if (playerIsInitialized && playerRef.current) {
      const nextId = getNextStationId(playerVideoId);
      playerRef.current.loadVideoById(nextId);
      setPlayerVideoId(nextId);
      setBackgroundImage(getNextBkg(backgroundImage)); 
      setLastFunc('next');
    }
  }

  const handlePlayPauseStream = () => {

    if (playerIsInitialized && playerRef.current) {
        if (playerState === 1) {
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.playVideo();
        }
    }
  }
    

  const handleRandomStation = () => {
     if (playerIsInitialized && playerRef.current) {
      const randId = getRandomStantionId(playerVideoId);
      playerRef.current.loadVideoById(randId);
      setPlayerVideoId(randId);
      setBackgroundImage(getRandomBkg());
      setLastFunc('rand');
    }
  }

  const handleVolumeChange = (e) => {
    const volume = parseInt(e.target.value, 10);
    if (playerIsInitialized && playerRef.current) {
      playerRef.current.setVolume(volume)
      savePlayerVolumeToLS(volume)
      setPlayerVolume(volume)
    }
  }

  // Check if YouTube Stream is unavailable and perform last player interaction.
  useEffect(() => {
    async function checkCurrentStation() {
      const vidOk = await checkVideoAvailability(playerVideoId);

      if (!vidOk) {
        setUnavailabilityText('Vid unavailable, skipping ...')
        setTimeout(() => {
          if (lastFunc === 'prev') {
            handlePreviousStation();
          } else if (lastFunc === 'rand') {
            handleRandomStation();
          } else {
            handleNextStation();
          }
        }, 2000)
      }
    }
    checkCurrentStation();
    setUnavailabilityText(null);
  }, [playerVideoId])


  return (
    <>
      <YouTube
            videoId={playerVideoId}
            opts={playerOptions}
            onStateChange={onPStateChange}
            onReady={onPReady}
      />

      <div className=' w-[230px] flex flex-col items-center justify-center gap-7 my-10 text-white'>
        <span>{unavailablityText ? unavailablityText : `${getReadableStatus(playerState)}`}</span>
        <span className='custom-font'>{playerRef.current && videoMetaData.title}</span>
        <ul className='flex flex-row w-full justify-between'>
            <li><InteractionButton onClick={handlePreviousStation} src={"/icons/prev.svg"}/></li>
            <li><InteractionButton src={"/icons/next.svg"} onClick={handleNextStation}/></li>
            <li><InteractionButton onClick={handlePlayPauseStream} src={playerState === 1 ? "/icons/pause.svg" : "/icons/play.svg"}/></li>
            <li><InteractionButton onClick={handleRandomStation} src={"/icons/shuffle.svg"}/></li>
        </ul>
        <div className='w-full'><input type="range" onChange={handleVolumeChange} value={playerVolume} style={{width: '100%'}} /></div>
      </div>
    </>
   
  )
}

export default Instance