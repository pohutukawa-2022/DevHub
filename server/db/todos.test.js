const config = require('./knexfile').test
const testDb = require('knex')(config)
const { getAllTodos, getTodosByUserId, addTodo } = require('./todos')

// At start of test file
beforeAll(() => {
  return testDb.migrate.latest()
})

// At end of test file
afterAll(() => {
  return testDb.destroy()
})

// Before every single test
beforeEach(() => {
  return testDb.seed.run()
})

test('getAllTodos returns all Todos (18) from the database', () => {
  return getAllTodos(testDb).then((todos) => {
    expect(todos).toHaveLength(18)
  })
})

test('getAllTodosByUserId returns all todos by user id', () => {
  return getTodosByUserId(2, testDb).then((res) => {
    expect(res).toHaveLength(7)
  })
})

test('addTodo adds a new task to the database', () => {
  const todo = {
    publish_date: '23-10-22',
    content: 'do a presentation',
    challenge_link: 'google.com',
    is_trello: true,
  }

  const usertodo = { user_id: 2, is_done: false, is_personal: false }

  return addTodo(todo, usertodo, testDb)
    .then((returned) => {
      expect(returned[0]).toBe(19)
      return getAllTodos(testDb)
    })
    .then((todos) => {
      expect(todos[18].content).toMatch('do a presentation')
    })
})
