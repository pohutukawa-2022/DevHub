import React, { useState } from 'react'
import { addTodo } from '../../api/todos'

function AddTodo(props) {
  const setAddClicked = props.setAddClicked

  const loadTodos = props.loadTodos
  const [input, setInput] = useState('')
  const [clicked, setClicked] = useState(true)

  function handleChange(event) {
    setInput(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newTodo = {
      content: input,
      challenge_link: '',
      is_trello: false,
      publish_date: new Date(),
    }
    const newUserTodo = {
      is_personal: true,
      is_done: false,
      user_id: 2,
    }

    addTodo(newTodo, newUserTodo)
      .then(() => loadTodos())
      .catch(() => {})
    //setClicked(!clicked)
  }
  return (
    <>
      {clicked && (
        <>
          <input
            type="text"
            className="text-vsblack  rounded w-5/6"
            onChange={handleChange}
          />
          <img
            src="images/addico.png"
            className="inline ml-2 absolute right-1 bottom-1"
            onClick={handleSubmit}
            alt="add"
          />
        </>
      )}
    </>
  )
}

export default AddTodo
