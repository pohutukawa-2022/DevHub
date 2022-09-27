const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/announcements')

const router = express.Router()

module.exports = router

// A public endpoint that anyone can access
// GET /api/v1/announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await db.getAllAnnouncements()
    res.json({ announcements })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

router.get('/:date', async (req, res) => {
  const currentDate = new Date(Number(req.params.date)).toDateString()
  console.log(currentDate)
  try {
    const announcements = await db.getAllAnnouncements()
    const currentDateAnnouncements = announcements
      .map((announcement) => {
        let stringDate = new Date(announcement.date).toDateString()
        return { ...announcement, date: stringDate }
      })
      .filter((announcement) => announcement.date === currentDate)
    res.json(currentDateAnnouncements)
  } catch (error) {
    console.error(error.message)
  }
})

// POST to api/v1/resources
router.post('/', async (req, res) => {
  try {
    const announcement = req.body
    const announcements = await db.addAnnouncement(announcement)
    res.json({ announcements })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const announcements = await db.deleteAnnouncement(id)
    res.json({ announcements })
  } catch (error) {
    console.error(error)
  }
})
