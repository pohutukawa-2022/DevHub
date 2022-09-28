import request from 'superagent'

const rootUrl = '/api/v1'

export function getAllResources() {
  return request
    .get(`${rootUrl}/resources`)
    .then((res) => res.body.resources)
    .catch(logError)
}

export function getResourcesByDate(date) {
  return request
    .get(`${rootUrl}/resources/${date}`)
    .then((res) => res.body)
    .catch(logError)
}

export function addResource(resource) {
  console.log(resource)
  return request.post(`${rootUrl}/resources/`).send(resource).catch(logError)
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
