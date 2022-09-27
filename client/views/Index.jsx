import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../api/api'
import { clearLoggedInUser, updateLoggedInUser } from '../slices/user'

function Index() {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
      loginWithRedirect({
        redirectUri: `${window.location.origin}/home`,
      })
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
  return <>this is home</>
}

export default Index
