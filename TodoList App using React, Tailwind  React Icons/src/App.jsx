import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './Components/Navbar'
import './App.css'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleEdit=()=>{

  }

  const handleDelete=()=>{
   
  }

  const handleChange=(e)=>{
     setTodo(e.target.value)
  }

  const handleAdd=()=>{
    setTodos([...todos,{todo,isCompleted:false}])
    setTodo("")
    console.log(todos)
    }


  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[70vh]">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} className='bg-white w-1/2' type="text"/>
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-xl mx-6'>Add</button>
        </div>
          <h2  className="text-2xl font-bold">Your Todos</h2>
          <div className="todos">
            {todos.map(item=>{

           
            return <div key={todo} className="todo flex">
               <div className={item.isCompleted?"":"line-through"}>{item.todo}</div>
               <div className="buttons">
                  <button onClick={handleEdit}className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-xl mx-1'>Edit</button>
                  <button onClick={handleDelete} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-xl mx-1'>Delete</button>
               </div>
            </div>
             })}
          </div>
      </div>
    </>
  )
}

export default App
