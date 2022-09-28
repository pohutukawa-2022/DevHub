const knex = require('knex')
const config = require('./knexfile').test
const testDb = knex(config)

const users = require('./users')

// Prevent Jest from timing out (5s often isn't enough)
jest.setTimeout(10000)

beforeAll(() => {
  return testDb.migrate.latest()
})

beforeEach(() => {
  return testDb.seed.run()
})

afterAll(() => {
  return testDb.destroy()
})

// describe('userExists', () => {
//   it('returns whether user is found by username', () => {
//     expect.assertions(1)
//     return users.userExists('1', testDb).then((users) => {
//       expect(users).toHaveLength(1)
//       expect(users[0].is_admin).toBeFalsy()
//       return null
//     })
//   })
// })

describe('getUser', () => {
  it('returns the correct user by auth0 number', () => {
    return users
      .getUser('auth0|632c4233fc04d8c0660e458e', testDb)
      .then((user) => {
        expect(user.first_name).toBe('Ahmad')
        expect(user.last_name).toBe('Anwar')
        expect(user.role).toBe('facilitator')
        expect(user.profile_picture).toBe(
          'https://avatars.githubusercontent.com/u/7552088?v=4'
        )
        expect(user.pronouns).toBe('he/him')
        expect(user.github_link).toBe('https://github.com/AhmedAnwarHafez')
        return null
      })
  })
})

// describe('createUser', () => {
//   it('creates a new user', () => {
//     const user = {
//       firstName: 'firstname',
//       lastName: 'lastname',
//       gardenId: 3,
//       email: 'random@emailz.co',
//       auth0Id: 'auth0|thisisfortesting',
//     }
//     return users
//       .createUser(user, testDb)
//       .then((ids) => users.getUserById(ids[0], testDb))
//       .then((user) => {
//         expect(user.id).not.toBeNull()
//         expect(user.firstName).toBe('firstname')
//         expect(user.lastName).toBe('lastname')
//         expect(user.gardenId).toBe(3)
//         expect(user.email).toBe('random@emailz.co')
//         expect(user.auth0Id).toBe('auth0|thisisfortesting')
//         return null
//       })
//   })
// })

// describe('userExists', () => {
//   it('returns true if user exists', () => {
//     return users
//       .userExists('auth0|61414f84d35ac900717bc280', testDb)
//       .then((exists) => {
//         expect(exists).toBeTruthy()
//         return null
//       })
//   })
//   it('returns false if user not found', () => {
//     return users
//       .userExists('other-non-existent-user', testDb)
//       .then((exists) => {
//         expect(exists).toBeFalsy()
//         return null
//       })
//   })
// })
