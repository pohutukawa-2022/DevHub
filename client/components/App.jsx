import React, { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useCacheUser } from '../auth0-utils'
import { useAuth0 } from '@auth0/auth0-react'
import { getUser } from '../api/api'
import Nav from './Nav'
import Register from './Register'
import Todos from '../subcomponents/Todos/Todos'
import Announcements from '../subcomponents/Announcements/Announcements'
import Resources from '../subcomponents/Resources/Resources'

import { useDispatch } from 'react-redux'
import { clearLoggedInUser, updateLoggedInUser } from '../slices/user'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
    } else {
      getAccessTokenSilently()
        .then((token) => getUser(token))
        .then((userInDb) => {
          userInDb
            ? dispatch(updateLoggedInUser(userInDb))
            : navigate('/register')
        })
        .catch((err) => console.error(err))
    }
  }, [isAuthenticated])

  return (
    <>
      <Nav />
      <Announcements />
      <Resources />
      <Todos />
    </>
  )
}

export default App
