const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/users')

const router = express.Router()

module.exports = router

// GET /api/v1/cohort
router.get('/', async (req, res) => {
  try {
    const cohort = await db.getAllUserImages()
    res.json({ cohort })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})
