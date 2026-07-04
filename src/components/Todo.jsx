
import { TodolistItem } from './TodolistItem'
import { useState } from 'react'
import { useEffect } from 'react'
import todo from "../assets/todo_icon.png"





export const Todo = () => {

   

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("")

    function handleInputChange(event){
        setNewTask(event.target.value)
    }

     useEffect(() => {
    fetch('http://localhost:3001/todos')
    .then((res) => res.json())
    .then((data) => setTasks(data));
}, []);

    function addTask(){
        if(newTask.trim() === "")
        {
            return;
        }

        const task = {
            text: newTask,
            completed: false,
        };
        setTasks([...tasks, task]);
        setNewTask("");

    }

    function deleteTask(index){
        const updatedTasks = tasks.filter((task, i) => i !== index)
        setTasks(updatedTasks);
    }

    function toggleComplete(index){
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    }

    function editTask(index,newText){
        const updatedTasks = [...tasks];
        updatedTasks[index].text = newText;
        setTasks(updatedTasks);
    }
    
    function moveTaskUp(index){}

    function moveTaskDown(index){}


  return (
    <div>

        <div className='bg-white  my-30 border-2 p-4 border-gray-100 max-w-6/12 mx-auto rounded-4xl' >
        <div>
        
            <span className='flex align-center p-4'>
                <img src={todo} className='w-12'/>
                <h1 className='text-4xl font-bold mt-1 '>Tasks</h1></span>
        </div>

        <div className='rounded-full bg-gray-200 flex items-center'>
            
            <input type='text' placeholder='Add task' value={newTask} onChange={handleInputChange}
             className='ml-2 bg-transparent border-0 outline-0 h-14 pl-6 rounded-full w-full'></input>
            <button onClick={addTask} className='h-14 w-32 text-red-500 text-xl rounded-full hover:bg-red-300 hover:text-white'>Add+</button>
        </div>

        <div>
           {tasks.map((task,index) =>
        {
            return(
                <>
            <TodolistItem 
            text={task.text}
             key={index}
             completed = {task.completed}
             toggleComplete = {toggleComplete}
             index = {index}
             deleteTask = {deleteTask}
             editTask= {editTask} />
             <hr className='my-2 border-gray-200'/>
             </>
            )
        })}

        </div>



        </div>
    </div>
  )
}
