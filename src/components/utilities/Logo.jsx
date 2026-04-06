import React from 'react'
import logo from "../../assets/Logo/zorvynlogo.png"
function Logo({width = "60px"}) {
  return (
    <div className='flex justify-center gap-2'>
        <img src={logo} alt="Logo-Image" width={width} />
    </div>
  )
}

export default Logo