import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useCacheUser } from '../auth0-utils'
import { useAuth0 } from '@auth0/auth0-react'
import { getUser } from '../api/api'
import Nav from './Nav'
import Register from './Register'
import Resources from '../subcomponents/Resources/Resources'

import Todos from '../subcomponents/Todos/Todos'

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
      <div className="bg-vsblack place-content-center">
        <div className="grid gap-4 grid-cols-1 grid-rows-6 w-96 m-auto">
          <Nav />
          <div>Todo</div>
          <div>Anounncements</div>
          <Resources />
          <div>On The Floor</div>
          <div>Journals</div>
        </div>
      </div>
    </>
  )
}

export default App
