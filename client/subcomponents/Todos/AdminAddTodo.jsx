import React, { useState } from 'react'
import { addTodo, addMultipleTodo } from '../../api/todos'

function AdminAddTodo(props) {
  // facilitators and students id - get from props
  const facilitatorsIds = [2]
  const studentsIds = [1]
  const currentUserId = 2

  const loadTodos = props.loadTodos

  const [input, setInput] = useState('')
  const [select, setSelect] = useState('me')
  const [clicked, setClicked] = useState(true)
  const [selectMultiple, setSelectMultiple] = useState(false)

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
      user_id: currentUserId,
    }

    function getArrayOfNewUserTodo(group) {
      switch (group) {
        case 'me':
          return newUserTodo

        case 'all-students':
          return studentsIds.map((id) => ({
            ...newUserTodo,
            user_id: id,
          }))

        case 'all-facilitators':
          return facilitatorsIds.map((id) => ({
            ...newUserTodo,
            user_id: id,
          }))

        case 'all':
          return facilitatorsIds.concat(studentsIds).map((id) => ({
            ...newUserTodo,
            user_id: id,
          }))
      }
    }
    // for each selection different
    console.log(select)
    const a = getArrayOfNewUserTodo(select)
    console.log(a)

    // a.map((newUserTodo) =>
    //   addTodo(newTodo, newUserTodo)
    //     .then(() => loadTodos())
    //     .catch(() => {})
    // )

    addMultipleTodo(newTodo, a)
      .then(() => loadTodos())
      .catch(() => {})

    setClicked(!clicked)
  }

  function handleSelectForMultiple(event) {}

  function handleSelectFor(event) {
    setSelect(event.target.value)
  }

  return (
    <>
      {clicked && (
        <>
          <input type="text" onChange={handleChange} />
          <label htmlFor="todo-for">Add for </label>
          <select name="todo-for" defaultValue="me" onChange={handleSelectFor}>
            <option value="me">me</option>
            <option value="all-students">all students</option>
            <option value="all-facilitators">all facilitators</option>
            <option value="all">all</option>
            <option value="some-people">selected people</option>
          </select>
          {!!selectMultiple && (
            <>
              <label htmlFor="select-people">Select person </label>
              <select
                name="select-people"
                defaultValue=""
                onChange={handleSelectForMultiple}
              >
                <option value="1">Rong</option>
                <option value="2">Yara</option>
                <option value="3">Vanessa</option>
                <option value="4">Sebastian</option>
              </select>
            </>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full text-base"
            onClick={handleSubmit}
          >
            Add
          </button>{' '}
        </>
      )}
    </>
  )
}

export default AdminAddTodo
