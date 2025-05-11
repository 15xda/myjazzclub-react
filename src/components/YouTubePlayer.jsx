import React from 'react'
import YouTube from 'react-youtube';

const YouTubePlayer = () => {

    const playerOptions = {
        height: '400',
        width: '400',
        playerVars: {
          autoplay: 0,
          controls: 0,
          playsinline: 1,
        },
    };

    const onStateChange = (e) => {
        switch (e.data) {
            case YT.PlayerState:
                console.log(YT.PlayerState)
        }
    }

  return (
    <div>
        <YouTube 
            videoId='hVFaaUEIpzE'
            opts={playerOptions}
            onStateChange={onStateChange}
        />
    </div>
  )
}

export default YouTubePlayer