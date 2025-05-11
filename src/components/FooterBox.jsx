import React from 'react'
import AudioPlayer from './AudioPlayer'

const FooterBox = () => {
  return (
    <div className='fixed bottom-0 flex items-center justify-center w-full bg-red-900' >
        <AudioPlayer/>
    </div>
  )
}

export default FooterBox