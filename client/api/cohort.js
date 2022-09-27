import request from 'superagent'

const rootUrl = '/api/v1'

export function getUserProfile() {
  return request.get(`${rootUrl}/cohort`).then((res) => res.body.cohort)
}
