const connection = require('./connection')

module.exports = {
  userExists,
  getUser,
  createUser,
  getAllUserImages,
  getProfileInfo,
  editProfile,
}

function userExists(username, db = connection) {
  return db('users')
    .where('username', username)
    .then((usersFound) => {
      return usersFound.length > 0
    })
}

function getUser(id, db = connection) {
  return db('users').select().where('auth0_id', id).first()
}

function createUser(user, db = connection) {
  return db('users').insert(user)
}

// For cohort component
function getAllUserImages(db = connection) {
  return db('users').select('id', 'first_name', 'last_name', 'profile_picture')
}

// For myprofile and othersprofile component
function getProfileInfo(db = connection) {
  return db('users').select(
    'id',
    'first_name',
    'last_name',
    'cohort',
    'pronouns',
    'github_link',
    'profile_picture'
  )
}

// For editprofile component
function editProfile(profile, db = connection) {
  return db('users').where('id', '=', profile.id).update({
    first_name: profile.first_name,
    last_name: profile.last_name,
    cohort: profile.cohort,
    pronouns: profile.pronouns,
    github_link: profile.github_link,
    profile_picture: profile.profile_picture,
  })
}
