import React, { useEffect, useState } from 'react'

import Todo from './Todo'
import { getTodosByUserId } from '../../api/todos'
import AddTodo from './AddTodo'
import AdminAddTodo from './AdminAddTodo'

function Todos() {
  const [todos, setTodos] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const currentUserId = 2

  function loadTodos() {
    getTodosByUserId(currentUserId)
      .then((todos) => {
        setTodos(todos)
      })
      .catch(() => {
        return false
      })
    return true
  }

  useEffect(() => {
    loadTodos()
  }, [])

  function handleClick(event) {
    event.preventDefault()
    setShowAdd(!showAdd)
  }

  return (
    <>
      <div className="flex flex-col relative bg-vslightblack rounded p-1.5 m-2 mt-1 text-left">
        <span className="text-vspink">Things to do:</span>

        {todos.map((todo) => (
          <Todo
            key={todo.user_todos_id}
            todo={todo}
            loadTodos={loadTodos}
            currentUserId={currentUserId}
          />
        ))}

        {
          <img
            src="images/addico.png"
            className="absolute top-1 right-1"
            onClick={handleClick}
            alt="add"
          />
        }

        {showAdd && (
          <div>
            <AddTodo loadTodos={loadTodos} />
          </div>
        )}

        {/* <button
          //className={addClicked ? 'invisible' : 'visible'}
          onClick={handleClick}
          className={showAdd ? 'hidden' : ''}
          //className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full text-base"
        >
          Add
        </button> */}
      </div>
    </>
  )
}

export default Todos
