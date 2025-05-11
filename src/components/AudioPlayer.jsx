import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBackward, 
  faForward, 
  faPause,
  faRandom,
  faPlay
 } from '@fortawesome/free-solid-svg-icons';

const AudioPlayer = () => {
  return (
   <div className=' w-[230px] bg-blue-900 flex flex-col items-center justify-center gap-7 my-10 text-white'>
    <span>Status Text</span>
    <span>YT Streat Title</span>
    <ul className='flex flex-row w-full justify-between'>
        <li><FontAwesomeIcon icon={faBackward}/></li>
        <li><FontAwesomeIcon icon={faForward}/></li>

        <li>
          {/* faPlay */}
          <FontAwesomeIcon icon={faPause}/>
        </li>

        <li><FontAwesomeIcon icon={faRandom}/></li>
    </ul>
    <div className='w-full'><input type="range" style={{width: '100%'}} /></div>
   </div>
  )
}

export default AudioPlayer