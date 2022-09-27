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
  //const [selectMultiple, setSelectMultiple] = useState(false)

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
            is_personal: false,
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
            is_personal: false,
          }))
      }
    }

    const arrayOfNewUserTodo = getArrayOfNewUserTodo(select)

    if (arrayOfNewUserTodo.length == 1) {
      addTodo(newTodo, newUserTodo)
        .then(() => loadTodos())
        .catch(() => {})
    } else {
      addMultipleTodo(newTodo, arrayOfNewUserTodo)
        .then(() => loadTodos())
        .catch(() => {})
    }

    props.setShowAdd(false)
  }

  function handleSelectFor(event) {
    setSelect(event.target.value)
  }

  return (
    <div className={props.showAdd ? '' : 'hidden'}>
      <input type="text" onChange={handleChange} />
      <label htmlFor="todo-for">Add for </label>
      <select name="todo-for" defaultValue="me" onChange={handleSelectFor}>
        <option value="me">me</option>
        <option value="all-students">all students</option>
        <option value="all-facilitators">all facilitators</option>
        <option value="all">all</option>
        <option value="some-people">selected people</option>
      </select>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full text-base"
        onClick={handleSubmit}
      >
        Add
      </button>{' '}
    </div>
  )
}

export default AdminAddTodo
