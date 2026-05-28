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
      <div className="container">
        <div className="bg-red-600">
          <h1>Your Todos</h1>
        </div>
      </div>
    </>
  )
}

export default App
