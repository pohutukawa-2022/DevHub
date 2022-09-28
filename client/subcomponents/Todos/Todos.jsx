import React, { useEffect, useState } from 'react'

import Todo from './Todo'
import { getTodosByUserId } from '../../api/todos'
import AddTodo from './AddTodo'
import { useSelector } from 'react-redux'

function Todos({ date }) {
  const [todos, setTodos] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const user = useSelector((state) => state.user)
  const today = date.toDateString()

  async function loadTodos() {
    try {
      const allTodos = await getTodosByUserId(user.id)
      console.log(allTodos)
      console.log(typeof today)
      const todosByDate = allTodos
        .map((todo) => {
          let stringDate = new Date(todo.date).toDateString()
          return { ...todo, date: stringDate }
        })
        .filter((todo) => todo.date === today)
      setTodos(todosByDate)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadTodos()
  }, [date, user.id])

  function handleClick(event) {
    event.preventDefault()
    setShowAdd(!showAdd)
  }

  return (
    <>
      <div className="flex flex-col relative bg-vslightblack rounded p-2 pl-3.5 m-2 mt-1 text-left">
        <span className="text-vspink text-lg">Things to do:</span>

        {todos.map((todo) => (
          <Todo
            key={todo.user_todos_id}
            todo={todo}
            loadTodos={loadTodos}
            currentUserId={user.id}
          />
        ))}

        <img
          src="../images/addico.png"
          className="absolute w-7 top-1 right-1"
          onClick={handleClick}
          alt="add"
        />

        {showAdd && (
          <div>
            <AddTodo date={date} loadTodos={loadTodos} />
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
