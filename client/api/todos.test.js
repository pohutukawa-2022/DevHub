const request = require('supertest')
const server = require('../../server/server')
const db = require('../../server/db/todos')

jest.mock('../../server/db/todos')

test('GET api/v1/todos returns all todos', () => {
  db.getAllTodos.mockImplementation(() => {
    const todos = [
      {
        id: 99901,
        publish_date: 'Karl',
        content: 'todo 1',
        challenge_link: 'urlhere',
        is_trello: false,
        created_by_id: 2,
      },
      {
        id: 99903,
        publish_date: 'Karl',
        content: 'todo 1',
        challenge_link: 'urlhercxvxe',
        is_trello: true,
        created_by_id: 2,
      },
      {
        id: 99902,
        publish_date: 'Karl',
        content: 'todo 1',
        challenge_link: 'urlcvxcvhere',
        is_trello: false,
        created_by_id: 2,
      },
    ]

    return Promise.resolve(todos)
  })

  return request(server)
    .get('/api/v1/todos')
    .expect(200) // OK
    .then((res) => {
      expect(res.body.todos).toHaveLength(3)
    })
})

test('GET api/v1/todos/:id returns todos by user ID', () => {
  db.getAllTodos.mockImplementation(() => {
    db.getTodosByUserId.mockImplementation(() => {
      const todos = [
        {
          id: 99901,
          publish_date: 'Karl',
          content: 'todo 1',
          challenge_link: 'urlhere',
          is_trello: false,
          created_by_id: 2,
        },
        {
          id: 99903,
          publish_date: 'Karl',
          content: 'todo 1',
          challenge_link: 'urlhercxvxe',
          is_trello: true,
          created_by_id: 2,
        },
      ]

      return Promise.resolve(todos)
    })

    return request(server)
      .get('api/v1/todos/2')
      .expect(200)
      .then((res) => {
        expect(res.body.todos).toHaveLength(2)
      })
  })
})
// test('GET /users/:id should fail when passing a non-numeric id', () => {
//   return request(server)
//     .get('/users/camel')
//     .expect(500) // Internal error
//     .then((res) => {
//       expect(res.body.error).toBe('invalid id format')
//     })
// })

// test('POST /users should return 201 status code', () => {
//   db.addNewUser.mockImplementation((user) => {
//     console.log(user)
//     return Promise.resolve()
//   })

//   const userData = {
//     name: 'Bryden',
//     email: 'goingToMelbourne@here.com',
//   }

//   return request(server)
//     .post('/users')
//     .send(userData)
//     .expect(201) // Created
//     .then((res) => {
//       expect(res.status).toBe(201) // Created
//     })
// })
