import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { addTodo } from '../../api/todos'

function AddTodo(props) {
  const setAddClicked = props.setAddClicked

  const loadTodos = props.loadTodos
  const [input, setInput] = useState('')
  const [clicked, setClicked] = useState(true)
  const user = useSelector((state) => state.user)

  function handleChange(event) {
    setInput(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newTodo = {
      content: input,
      challenge_link: '',
      is_trello: false,
      publish_date: props.date,
      created_by_id: Number(user.id),
    }
    const newUserTodo = {
      is_personal: true,
      is_done: false,
      user_id: Number(user.id),
    }

    addTodo(newTodo, newUserTodo)
      .then(() => loadTodos())
      .catch(() => {})
    setClicked(false)
  }
  return (
    <>
      {clicked && (
        <>
          <input
            type="text"
            className="text-vsblack  rounded w-5/6"
            onChange={handleChange}
            name="newTodo"
            placeholder=" Add your todo here"
          />
          <img
            src="../images/addico.png"
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
