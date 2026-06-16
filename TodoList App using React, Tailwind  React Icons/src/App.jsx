import { useState,useEffect } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './Components/Navbar'
import './App.css'
import { v4 as uuidv4 } from "uuid";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos =JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS =(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const togglefinished = (e) => {
    setshowfinished(!showfinished)
  }
  

const handleEdit = (id) => {
  const todoToEdit = todos.find(item => item.id === id);

  if (!todoToEdit) return;

  setTodo(todoToEdit.todo);

  const newTodos = todos.filter(item => item.id !== id);
  setTodos(newTodos);
  saveToLS()
};

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    saveToLS()
  }

  const handleCheckbox = (e) => {
   
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id
    });
   
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

    saveToLS()
  };


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[70vh] max-w-[97vw]">
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} className='bg-white w-1/2' type="text" />
          <button onClick={handleAdd} disabled={todo.length<3} className='bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-xl mx-6'>Save</button>
        </div>
        <input onChange={togglefinished} type="checkbox" checked={showfinished} /> show Finished
        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No todos to display</div>}
          {todos.map(item => {

            return <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
              <div className='flex gap-5'>

              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}
              </div>
              </div>
              <div className="buttons flex h-full">
                <button
                  onClick={() => handleEdit(item.id)}
                  className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-xl mx-1'>Edit
                </button>
                <button onClick={(e) => { handleDelete(item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-xl mx-1'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
