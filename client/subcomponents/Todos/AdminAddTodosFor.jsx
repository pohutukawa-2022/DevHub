import React, { useState } from 'react'

function AdminAddTodosFor() {
  const [select, setSelect] = useState('me')
  
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

  function handleSelectFor(event) {
    setSelect(event.target.value)
  }
  const a = getArrayOfNewUserTodo(select)
  console.log(a)
  return (
    <>
      <label htmlFor="todo-for">Add for </label>
      <select name="todo-for" defaultValue="me" onChange={handleSelectFor}>
        <option value="me">me</option>
        <option value="all-students">all students</option>
        <option value="all-facilitators">all facilitators</option>
        <option value="all">all</option>
        <option value="some-people">selected people</option>
      </select>
    </>
  )
}
