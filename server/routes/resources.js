const express = require('express')
const { checkJwt } = require('../auth0')
const db = require('../db/resources')

const router = express.Router()

module.exports = router

// GET from api/v1/resources
router.get('/', async (req, res) => {
  try {
    const resources = await db.getAllResources()
    res.json({ resources })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

// POST to api/v1/resources
router.post('/', async (req, res) => {
  try {
    const resource = req.body
    console.log(resource)
    const resources = await db.addResource(resource)
    res.json({ resources })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

// GET from api/v1/:date
router.get('/:date', async (req, res) => {
  const selectedDate = new Date(Number(req.params.date)).toDateString()

  try {
    const resources = await db.getAllResources()
    const resourceByDate = resources
      .map((resource) => {
        let stringDate = new Date(resource.date).toDateString()
        return { ...resource, date: stringDate }
      })
      .filter((resource) => resource.date === selectedDate)
    res.json(resourceByDate)
  } catch (error) {
    console.error(error.message)
  }
})
