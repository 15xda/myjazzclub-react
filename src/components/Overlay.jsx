import React from 'react'

const Overlay = () => {
  return (
    <div className='absolute inset-0 z-100 pointer-events-none'>
      <img className='h-full w-full object-cover opacity-12' src="public/overlays/noise.gif" alt="" />
      <img className='h-full w-full object-cover opacity-12' src="public/overlays/dirt.webp" alt="" />
    </div>
  )
}

export default Overlay
