const config = require('./knexfile').test
const testDb = require('knex')(config)
const { getAllTodos, getTodosByUserId } = require('./db')

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

test('getaAll returns all Todos from the database', () => {
  return getAllTodos(testDb).then((todos) => {
    console.log(todos)
    // Check for 3 records
    expect(todos).toHaveLength(18)
  })
})

// test('addTodo adds a new task to the database', () => {
//   // Add a task to TODO table
//   const todoTask = 'Do a cartwheel'
//   return addTodo(todoTask, testDb)
//     .then((returned) => {
//       console.log(returned)
//       expect(returned[0]).toBe(4)

//       return getAll(testDb)
//     })
//     .then((tasks) => {
//       // Check the last row / data is the one we added
//       expect(tasks[3].task).toMatch(todoTask)
//     })
// })
