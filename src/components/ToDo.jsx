import { AddTask } from './AddTask';
import './style.css';
import editImg from './edit.png'
import { useEffect, useState } from 'react';
import { Popup } from './Popup';

export const ToDo = () => {
  const [popup,setPopup] = useState(true)
  const [name,setName] = useState(()=>{
    const localData = JSON.parse(localStorage.getItem('userName'))
    return localData || ''
  })

  useEffect(()=>{
    if(name===''){
      setPopup(false)
    }
  })

  const handleData = (value) => {
    setName(value)
  }

  const handleSave = () => {
    localStorage.setItem('userName', JSON.stringify(name))
    setPopup(true)
  }

  return (
    <>
        {popup ? 
        <>
          <div className="logo">
            
            </div>
            <div className="container">
              <div className="greet">
                <h1>Hello, {name}</h1>
                <button onClick={()=>setPopup(false)}><img src={editImg} /></button>
              </div>
              <div className="add">
                <AddTask/>
              </div>
            </div>
        </> :
        <Popup nameData={handleData} close={handleSave}/>}
    </>
  )
}
