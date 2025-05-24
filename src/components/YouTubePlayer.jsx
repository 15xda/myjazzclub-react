


const YouTubePlayer = ({stationId}) => {

  


  return (
    <div>
        <YouTube
            videoId={playerVideoId}
            opts={playerOptions}
            onStateChange={onPStateChange}
            onReady={onPReady}
        />
      <button className='bg-white p-5 m-5 rounded-xl cursor-pointer' onClick={handlePlayPauseStream}>{playerState === 1 ? 'Pause' : 'Play'}</button>
      <button className='bg-white p-5 m-5 rounded-xl cursor-pointer' onClick={handlePreviousStation}>Prev</button>
      <button className='bg-white p-5 m-5 rounded-xl cursor-pointer' onClick={handleNextStation}>Next</button>
      <button className='bg-white p-5 m-5 rounded-xl cursor-pointer' onClick={handleRandomStation}>Random</button>
      <input type="range" onChange={handleVolumeChange} value={playerVolume} id="volumeInput" />
    </div>
  )
}

export default YouTubePlayer