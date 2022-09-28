const express = require('express')
const checkJwt = require('../auth0')
const db = require('../db/journal')

const router = express.Router()

module.exports = router

// GET from api/v1/journal/:id/:date
router.get('/:id/:date', async (req, res) => {
  const selectedId = Number(req.params.id)
  const selectedDate = new Date(Number(req.params.date)).toDateString()

  try {
    const journals = await db.getAllJournals()
    const journalsByDateNId = journals
      .map((journal) => {
        let stringDate = new Date(journal.date).toDateString()
        return { ...journal, date: stringDate }
      })
      .filter((journal) => journal.date === selectedDate)
      .filter((journal) => journal.user_id === selectedId)

    res.json({ journalsByDateNId })
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})

router.post('/:id/:date', async (req, res) => {
  const newJournal = req.body
  try {
    await db.updateJournal(newJournal)
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
})
