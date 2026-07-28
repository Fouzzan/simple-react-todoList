import { Fragment, useEffect, useState } from 'react'
import { TodolistItem } from './TodolistItem'
import todo from "../assets/todo_icon.png"

const API_URL = 'http://localhost:3001/todos'

export const Todo = () => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    function handleInputChange(event){
        setNewTask(event.target.value)
    }

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await fetch(API_URL)
                if (!response.ok) {
                    throw new Error('Could not load tasks')
                }

                const data = await response.json()
                setTasks(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTasks()
    }, [])

    async function addTask(){
        if(newTask.trim() === "")
        {
            return
        }

        const task = {
            text: newTask.trim(),
            completed: false,
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            })

            if (!response.ok) {
                throw new Error('Could not add task')
            }

            const savedTask = await response.json()
            setTasks([...tasks, savedTask])
            setNewTask("")
            setError("")
        } catch (err) {
            setError(err.message)
        }
    }

    async function deleteTask(id){
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Could not delete task')
            }

            setTasks(tasks.filter((task) => task.id !== id))
            setError("")
        } catch (err) {
            setError(err.message)
        }
    }

    async function toggleComplete(id){
        const task = tasks.find((item) => item.id === id)
        if (!task) {
            return
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !task.completed }),
            })

            if (!response.ok) {
                throw new Error('Could not update task')
            }

            const updatedTask = await response.json()
            setTasks(tasks.map((item) => item.id === id ? updatedTask : item))
            setError("")
        } catch (err) {
            setError(err.message)
        }
    }

    async function editTask(id, newText){
        const trimmedText = newText.trim()
        if (trimmedText === "") {
            return
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: trimmedText }),
            })

            if (!response.ok) {
                throw new Error('Could not edit task')
            }

            const updatedTask = await response.json()
            setTasks(tasks.map((task) => task.id === id ? updatedTask : task))
            setError("")
        } catch (err) {
            setError(err.message)
        }
    }
    
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
            {isLoading && <p className='p-4 text-gray-500'>Loading tasks...</p>}
            {error && <p className='p-4 text-red-500'>{error}</p>}
           {tasks.map((task) =>
        {
            return(
                <Fragment key={task.id}>
            <TodolistItem 
            id={task.id}
            text={task.text}
             completed = {task.completed}
             toggleComplete = {toggleComplete}
             deleteTask = {deleteTask}
             editTask= {editTask} />
             <hr className='my-2 border-gray-200'/>
             </Fragment>
            )
        })}

        </div>



        </div>
    </div>
  )
}
