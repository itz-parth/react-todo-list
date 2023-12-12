    import {  useEffect,useRef, useState } from 'react'
    import React from 'react'
    import editImg from './edit.png'
    import delImg from './delete.png'

    export const AddTask = () => {
        const [list,setList] = useState(()=>{
            const localData = JSON.parse(localStorage.getItem('userData'))
            return localData || []
        });
        const [text,setText] = useState('');
        const [edit,setEdit] = useState(null);
        const [showBtn,setShowBtn] = useState(false);
        const inputRef = useRef(null);

        
       

        useEffect(() => {
            localStorage.setItem('userData', JSON.stringify(list))
        },[list])

        useEffect(() => {
            if(inputRef.current && showBtn){
                inputRef.current.focus();
            }
        },[showBtn, edit])
        

        const handleAdd = () => {
            if(text !== ''){
                if(edit !== null){
                    const newList = [...list]
                    newList[edit] = text;
                    setList(newList);
                }
                else{
                    if(list.length < 10){
                        setList([...list,text]);
                    }else{
                        alert('Limit Reached')
                    }
                }
            }
            setText('');
            setShowBtn(false);
        }

        const handleChange = (e) => {
            setText(e.target.value);
        }

        const handleDelete = (i) => {   
            const newList = [...list]
            newList.splice(i,1);
            setList(newList);
        }

        const handleEdit = (i) => {
            setShowBtn(true)
            setText(list[i]);
            setEdit(i);
          };          

        const handleKey = (e) => {
            if(e.key === 'Enter'){
                handleAdd();
            }
        }

    return (
        <>
            <div className="task-list">
                <ul>
                    {list.map((task,index) =><li key={index} className='task-item'>
                        <span>{task}</span>
                        <div>
                            <button className='edit-btn' onClick={()=> handleEdit(index)}>
                                <img src={editImg} alt="" />
                            </button>
                            <button className='del-btn' onClick={()=> handleDelete(index)}>
                                <img src={delImg} alt="" />
                            </button>
                        </div>
                    </li>)}
                </ul>
                {showBtn ? (
                    <div className="add">
                        <div className="txt-box">
                            <input
                                type="text"
                                value={text}
                                onChange={handleChange}
                                onKeyDown={handleKey}
                                ref={inputRef}
                                title=""
                                placeholder="Enter Your Task"
                                required/>
                        </div>
                        <div className="add-btn">
                            <button onClick={handleAdd}>Add</button>
                        </div>
                    </div>
                ) : (
                    <div className="add-task">
                        <button onClick={() => setShowBtn(true)}>Add New Task</button>
                    </div>
                )}
            </div>
        </>
    )
    }
