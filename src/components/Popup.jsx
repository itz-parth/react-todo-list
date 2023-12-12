import React, { useEffect, useRef, useState } from 'react'
import './style.css'

export const Popup = ({nameData, close}) => {
    const[name,setname] = useState([])
    const nameRef = useRef(null)

    useEffect(()=>{
        nameRef.current.focus()
    })

    const handleClick=()=>{
        nameData(name)
        close()
    }

    const handleKey=(e)=>{
        if(e.key === 'Enter'){
            handleClick();
        }
    }

  return(
    <>
        <div className="popup">
            <div className="inner-popup">
                <h1>Enter Name...</h1>
                <input type="text" onChange={(e)=>setname(e.target.value)} onKeyDown={handleKey} ref={nameRef} title=''/>
                <button onClick={handleClick}>Save</button>
            </div>
        </div>
    </> 
  ) 
}
