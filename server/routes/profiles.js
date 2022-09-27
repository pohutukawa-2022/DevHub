const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/users')

const router = express.Router()

module.exports = router

// GET /api/v1/profiles
router.get('/', async (req, res) => {
  try {
    const profile = await db.getProfileInfo()
    res.json({ profile })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

// POST /api/v1/profiles
router.post('/', async (req, res) => {
  const editedProfile = req.body
  console.log(editedProfile)

  try {
    await db.editProfile(editedProfile)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})
