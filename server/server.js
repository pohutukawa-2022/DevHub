const path = require('path')
const express = require('express')

const announcementsRoutes = require('./routes/announcements')
const fruitRoutes = require('./routes/fruits')
const todosRoutes = require('./routes/todos')
const userRoutes = require('./routes/users')
const cohortRoutes = require('./routes/cohort')
const profilesRoutes = require('./routes/profiles')
const resourceRoutes = require('./routes/resources')
const journalRoutes = require('./routes/journal')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/fruits', fruitRoutes)
server.use('/api/v1/users', userRoutes)
server.use('/api/v1/todos', todosRoutes)
server.use('/api/v1/announcements', announcementsRoutes)
server.use('/api/v1/cohort', cohortRoutes)
server.use('/api/v1/profiles', profilesRoutes)
server.use('/api/v1/resources', resourceRoutes)
server.use('/api/v1/journal', journalRoutes)

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

module.exports = server
