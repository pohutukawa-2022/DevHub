import React from 'react'
import { updateTodo, deleteTodo } from '../../api/todos'
// import Trello from '../Icons/Trello'

function Todo(props) {
  const {
    user_todos_id,
    user_id,
    todo_id,
    date,
    content,
    challenge_link,
    inTrello,
    isDone,
    isPersonal,
    currentUserId
  } = props.todo

  const loadTodos = props.loadTodos

  function handleBoxChecked() {
    const newTodo = {
      ...props.todo,
      isDone: !props.todo.isDone
    }

    updateTodo(newTodo, currentUserId)
      .then(() => loadTodos())
      .catch(() => {})
  }

  function handleDelete() {
    deleteTodo(user_todos_id)
      .then(() => loadTodos())
      .catch(() => {})
  }

  return (
    <>
      <div className={isDone ? 'line-through text-vsgrey	' : ''}>
        <input
          className="mr-2 accent-vsgrey"
          onChange={handleBoxChecked}
          type="checkbox"
          name=""
          value=""
          checked={isDone && 'checked'}
        />

        {challenge_link ? (
          <a href={challenge_link} className="no-underline">
            {content}
          </a>
        ) : (
          content
        )}

        {!!inTrello && (
          <span className="">
            <img
              src="../images/trelloico.png"
              className="inline ml-2 mb-1 w-4"
              alt="trello"
            />
          </span>
        )}

        {!!isPersonal && (
          <span className=" text-zinc-400">
            <img
              onClick={handleDelete}
              src="../images/deleteico.png"
              className="inline ml-2 mb-1 w-4"
              alt="delete"
            />
          </span>
        )}
      </div>
    </>
  )
}

export default Todo
