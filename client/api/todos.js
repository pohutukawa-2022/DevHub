import request from 'superagent'

const rootUrl = '/api/v1'

export function getTodos() {
  console.log('hitting rout gettodo')
  return request
    .get(`${rootUrl}/todos`)
    .then((res) => res.body.todos)
    .catch(logError)
}

export function getTodosByUserId(userId) {
  return request
    .get(`${rootUrl}/todos/${userId}`)
    .then((res) => {
      return res.body.todos
    })
    .catch(logError)
}

export function addTodo(todo, users, token) {
  return request
    .post(`${rootUrl}/todos`)
    .set('authorization', `Bearer ${token}`)
    .send({ todo, users })
    .then((res) => res.body.todos)
    .catch(logError)
}

export function addMultipleTodo(todo, users, token) {
  return request
    .post(`${rootUrl}/todos`)
    .set('authorization', `Bearer ${token}`)
    .send({ todo, users })
    .then((res) => res.body.todos)
    .catch(logError)
}

export function updateTodo(todo, currentUserId, token) {
  return request
    .put(`${rootUrl}/todos`)
    .set('authorization', `Bearer ${token}`)
    .send({ todo, currentUserId })
    .then((res) => res.body.todos)
    .catch(logError)
}

export function deleteTodo(id, token) {
  console.log('from delete api', id)
  return request
    .delete(`${rootUrl}/todos/${id}`)
    .set('authorization', `Bearer ${token}`)
    .then((res) => res.body.todos)
    .catch(logError)
}

function logError(err) {
  if (err.response.text === 'Username Taken') {
    throw new Error('Username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error('Access error')
  } else {
    // eslint-disable-next-line no-console
    console.error('Error consuming the API (in client/api.js):', err.message)
    throw err
  }
}
