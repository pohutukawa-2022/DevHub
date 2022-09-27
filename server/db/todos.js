const connection = require('./connection')

module.exports = {
  getAllTodos,
  getTodosByUserId,
  getTodosByUserIdAndDate,
  updateTodo,
  addTodo,
  addMultipleTodo,
  deleteTodo,
}

// sort by date
// function sort(fruitArray) {
//   const allFruits = [...fruitArray]
//   allFruits.sort((a, b) => a.id - b.id)
//   return allFruits
// }

// GET all todos
function getAllTodos(db = connection) {
  return db('user_todos')
    .join('todos', 'user_todos.todo_id', 'todos.id')
    .join('users', 'user_todos.user_id', 'users.id')
    .select(
      'user_todos.id as user_todos_id',
      'todos.id as todo_id',
      'users.id as user_id',
      'publish_date as date',
      'content',
      'challenge_link',
      'is_trello as inTrello',
      'is_done as isDone',
      'is_personal as isPersonal'
    )
}

//GET todos by user id
function getTodosByUserId(id) {
  return getAllTodos().where('user_id', id)
}

//GET todos by user id and date
function getTodosByUserIdAndDate(id, date) {
  return getAllTodos().where('users_id', id).where('publish_date', date)
}

function addTodo(todo, usertodo, db = connection) {
  return db('todos')
    .insert(todo)
    .then((id) => db('user_todos').insert({ ...usertodo, todo_id: id }))
}

function addMultipleTodo(todo, usersTodos, db = connection) {
  const { publish_date, content, challenge_link, is_trello } = todo
  return db('todos')
    .insert({ publish_date, content, challenge_link, is_trello })
    .then(([id]) => {
      return Promise.all(
        usersTodos.map((userTodo) => {
          return db('user_todos').insert({ ...userTodo, todo_id: id })
        })
      )
    })
    .then((results) => results.flat())
}

function updateTodo(newTodo, db = connection) {
  const { id, is_done } = newTodo
  return (
    db('user_todos')
      .where('id', id)
      .update({ is_done })
      // //.where('user_id', newTodo.user_id)
      // .then(() => {
      //   return db('user_todos').where('user_id', user_id).update({ is_done })
      // })
      .then(() => db)
  )
}

async function deleteTodo(id, db = connection) {
  return db('todos')
    .where('id', id)
    .first()
    .delete()
    .then(() => {
      return db('user_todos').where('todo_id', id).delete()
    })
    .then(() => db)
}

// function authorizeUpdate(fruit, auth0Id) {
//   if (fruit.added_by_user !== auth0Id) {
//     throw new Error('Unauthorized')
//   }
// }
