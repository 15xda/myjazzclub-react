import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUpRightAndDownLeftFromCenter, 
  faDownLeftAndUpRightToCenter, 
  faWandMagicSparkles,
  faCompass
 } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';
import { backgroundState } from '../recoil/atoms';
import { getRandomBkg } from '../utils/backgroundControls';
import InteractionButton from './InteractionButton';

const HeaderBox = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useRecoilState(backgroundState);

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
      <div className='logo-text text-3xl'>My JazzCLub</div>
      <div>
        <ul className="flex flex-row space-x-10 font-base">
            <li>
              <InteractionButton onClick={toggleFullscreen} src={fullscreen ? '/icons/collapse.svg' : '/icons/expand.svg'}/>
            </li>
            <li>
              <InteractionButton onClick={() => setBackgroundImage(getRandomBkg())}
                src={'/icons/image.svg'}/>
            </li>
            <li>
              <InteractionButton src={'/icons/heart.svg'}/>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderBox