const connection = require('./connection')

module.exports = {
  getAllJournals,
  updateJournal,
}

// GET all todos
function getAllJournals(db = connection) {
  return db('journals').select()
}

function updateJournal(newJournal, db = connection) {
  return db('journals')
    .insert(newJournal)
}
