import React, { useState } from 'react'
import tick from "../assets/tick.png"
import notTick from "../assets/not_tick.png"
import deleteIcon from "../assets/delete.png"
import edit from "../assets/edit.png"


export const TodolistItem = ({text,completed,index,deleteTask,toggleComplete,editTask}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);

   
  return (
    <div>
        <div className='flex items-center my-3 gap-2 group'>
            <div className='flex flex-1 items-center cursor-pointer'>
                <img className='w-5' onClick={() =>{toggleComplete(index)}}src={completed? tick:notTick }  alt='' />
                
                    {
                        isEditing ? (
                            <input
                                className='ml-3 p-2 bg-gray-200 w-full rounded-full'
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)
                                    
                                }
                            />
                            
                        ) : (
                            <p className={completed? "line-through text-gray-400 ml-4 text-[17px]" : 'text-slate-700 ml-4 text-[17px]'}>
                                {text}
                                </p>
                        )
                    }
                   
            </div>
            {
                isEditing ? (
                    <button
                         onClick={() => {
                         editTask(index, editedText);
                        setIsEditing(false);
                                }}
                        className="text-blue-500">Save</button>
                    ):
                    (
                        <img src={edit} onClick={()=> setIsEditing(true)} className='cursor-pointer w-5 text-gray-200 hidden group-hover:block' />
                    )
                }
            
            
            <img src={deleteIcon} onClick={() =>deleteTask(index)} className='w-3.5 cursor-pointer hidden group-hover:block' />
            
        </div>

    
    </div>
  )
}
