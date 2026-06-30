import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import './App.css'
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  // Load once on mount
  useEffect(() => {
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      setTodos(JSON.parse(todoString))
    }
  }, [])

  // Save whenever todos actually changes — fixes the stale-state bug
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const togglefinished = () => setshowfinished(prev => !prev)

  const handleEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id)
    if (!todoToEdit) return
    setTodo(todoToEdit.todo)
    setTodos(todos.filter(item => item.id !== id))
  }

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id))
  }

  const handleChange = (e) => setTodo(e.target.value)

  const handleCheckbox = (e) => {
    const id = e.target.name
    setTodos(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    )
  }

  const handleAdd = () => {
    if (todo.trim().length < 3) return
    setTodos([...todos, { id: uuidv4(), todo: todo.trim(), isCompleted: false }])
    setTodo("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd()
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-4 sm:my-6 rounded-xl p-4 sm:p-6 bg-violet-100 min-h-[80vh] w-[95%] sm:w-[90%] md:w-3/4 lg:w-1/2">
        <h1 className="font-bold text-center text-lg sm:text-xl">
          iTask – Manage your todos in one place
        </h1>

        <div className="addTodo my-5 flex flex-col gap-3">
          <h2 className="text-base sm:text-lg font-bold">Add a Todo</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={todo}
              placeholder="What needs to be done?"
              className="rounded-full px-5 py-2 bg-white w-full outline-none focus:ring-2 focus:ring-violet-400"
              type="text"
            />
            <button
              onClick={handleAdd}
              disabled={todo.trim().length < 3}
              className="bg-violet-800 disabled:bg-violet-300 disabled:cursor-not-allowed hover:bg-violet-950 px-4 py-2 text-sm font-bold text-white rounded-full whitespace-nowrap transition-colors"
            >
              Save
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 my-4 text-sm sm:text-base cursor-pointer select-none">
          <input
            onChange={togglefinished}
            type="checkbox"
            checked={showfinished}
            className="w-4 h-4 accent-violet-800"
          />
          Show Finished
        </label>

        <h2 className="text-xl sm:text-2xl font-bold mb-2">Your Todos</h2>

        <div className="todos flex flex-col gap-3">
          {todos.length === 0 && (
            <div className="m-5 text-center text-gray-500">No todos to display</div>
          )}
          {todos.map(item => {
            const visible = !item.isCompleted || showfinished
            if (!visible) return null
            return (
              <div
                key={item.id}
                className="todo flex items-center justify-between gap-3 bg-white rounded-xl px-4 py-2 shadow-sm w-full"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="w-4 h-4 accent-violet-800 shrink-0"
                  />
                  <span className={`truncate ${item.isCompleted ? "line-through text-gray-400" : ""}`}>
                    {item.todo}
                  </span>
                </div>
                <div className="buttons flex shrink-0">
                  <button
                    onClick={() => handleEdit(item.id)}
                    aria-label="Edit todo"
                    className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold text-white rounded-xl mx-1 transition-colors"
                  >
                    <CiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    aria-label="Delete todo"
                    className="bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold text-white rounded-xl mx-1 transition-colors"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App