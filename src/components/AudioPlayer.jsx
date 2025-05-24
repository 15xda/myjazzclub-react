import React, { useRef, useState } from 'react'
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBackward, 
  faForward, 
  faPause,
  faRandom,
  faPlay
 } from '@fortawesome/free-solid-svg-icons';


import { getPlayerVolumeFromLS, savePlayerVolumeToLS } from '../utils/getPlayerVolume';
import { getNextStationId, getPreviousStationId, getRandomStantionId} from '../utils/playerControles';
import getReadableStatus from '../utils/getReadableStatus';

const AudioPlayer = () => {
  const playerRef = useRef();
  const [playerIsInitialized, setPlayerIsInitialized] = useState(false);
  const [playerVolume, setPlayerVolume] = useState(getPlayerVolumeFromLS());
  const [playerVideoId, setPlayerVideoId] = useState(getRandomStantionId());
  const [playerState, setPlayerState] = useState(-1);

  const [videoMetaData, setVideoMetaData] = useState();

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

  console.log(videoMetaData)
  

  const handlePreviousStation = () => {
    if (playerIsInitialized && playerRef.current) {
      const prevId = getPreviousStationId(playerVideoId);
      playerRef.current.loadVideoById(prevId);
      setPlayerVideoId(prevId);
    }
  }

  const handleNextStation = () => {

    if (playerIsInitialized && playerRef.current) {
      const nextId = getNextStationId(playerVideoId);
      playerRef.current.loadVideoById(nextId);
      setPlayerVideoId(nextId);
    }
  }

  const handlePlayPauseStream = () => {
    if (playerIsInitialized && playerRef.current) {
      switch (playerState) {
        case 1:
          playerRef.current.pauseVideo();
          break;
        case 2:
          playerRef.current.playVideo();
          break;
      }
    }
    
  }

  const handleRandomStation = () => {
     if (playerIsInitialized && playerRef.current) {
      const randId = getRandomStantionId(playerVideoId);
      playerRef.current.loadVideoById(randId);
      setPlayerVideoId(randId);
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

  return (
    <>
      <YouTube
            videoId={playerVideoId}
            opts={playerOptions}
            onStateChange={onPStateChange}
            onReady={onPReady}
      />

      <div className=' w-[230px] flex flex-col items-center justify-center gap-7 my-10 text-white'>
        <span>{getReadableStatus(playerState)}</span>
        <span>{playerRef.current && videoMetaData.title}</span>
        <ul className='flex flex-row w-full justify-between'>
            <li><button onClick={handlePreviousStation}><FontAwesomeIcon icon={faBackward}/></button></li>
            <li><button onClick={handleNextStation}><FontAwesomeIcon icon={faForward}/></button></li>
            <li><button onClick={handlePlayPauseStream}><FontAwesomeIcon icon={playerState === 1 ? faPause : faPlay}/></button></li>
            <li><button onClick={handleRandomStation}><FontAwesomeIcon icon={faRandom}/></button></li>
        </ul>
        <div className='w-full'><input type="range" onChange={handleVolumeChange} value={playerVolume} style={{width: '100%'}} /></div>
      </div>
    </>
   
  )
}

export default AudioPlayer