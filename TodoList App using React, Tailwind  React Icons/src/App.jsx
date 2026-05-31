import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './Components/Navbar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[70vh]">
        <div className="addTodo">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input className='bg-white' type="text"/>
          <button className='bg-violet-800 hover:bg-violet-950 p-3 py-1'>Add</button>
        </div>
          <h2  className="text-2xl font-bold">Your Todos</h2>
          <div className="todos">
            <div className="todo flex">
               <div className="text">Lorem, ipsum dolor sit amet consectetur adipisicing.</div>
               <div className="buttons">
                  <button>Edit</button>
                  <button>Delete</button>
               </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
