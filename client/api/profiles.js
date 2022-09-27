import request from 'superagent'

const rootUrl = '/api/v1'

export function getUserProfileInfo() {
  return request.get(`${rootUrl}/profiles`).then((res) => res.body.profile)
}

export function editProfile(profile) {
  return request.post(`${rootUrl}/profiles/`).send(profile).catch(logError)
}

function logError(err) {
  if (err.response.text === 'Username Taken') {
    throw new Error('Username already taken - please choose another')
  } else if (err.message === 'Forbidden') {
    throw new Error(
      'Only the user who added the fruit may update and delete it'
    )
  } else {
    // eslint-disable-next-line no-console
    console.error('Error consuming the API (in client/api.js):', err.message)
    throw err
  }
}
