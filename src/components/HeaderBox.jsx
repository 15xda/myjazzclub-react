import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUpRightAndDownLeftFromCenter, 
  faDownLeftAndUpRightToCenter, 
  faWandMagicSparkles,
  faCompass
 } from '@fortawesome/free-solid-svg-icons';

const HeaderBox = () => {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!fullscreen) {
      document.body.requestFullscreen();
      setFullscreen(true)
    } else {
      document.exitFullscreen();
      setFullscreen(false)
    }
    
  }
  return (
    <div className='flex flex-row items-center justify-between p-10 text-white'>
      <div className='text-2xl font-bold'>myJazzCLub</div>
      <div>
        <ul className="flex flex-row space-x-10 font-base">
            <li>
              <button onClick={toggleFullscreen}><FontAwesomeIcon icon={fullscreen ? faDownLeftAndUpRightToCenter : faUpRightAndDownLeftFromCenter} className='text-xl'/></button>
            </li>

            <li><FontAwesomeIcon icon={faWandMagicSparkles} className='text-xl'/></li>
            <li><FontAwesomeIcon icon={faCompass} className='text-xl'/></li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderBox