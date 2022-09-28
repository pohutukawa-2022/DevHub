import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useCacheUser } from '../auth0-utils'
import { useAuth0 } from '@auth0/auth0-react'
import { getUser } from '../api/api'
import Nav from './Nav'
import Register from './Register'
import Cohort from './Cohort'
import Profile from '../subcomponents/Profile/Profile'
import MyProfile from '../subcomponents/Profile/MyProfile'
import EditMyProfile from '../subcomponents/Profile/EditMyProfile'
import Todos from '../subcomponents/Todos/Todos'

import Announcements from '../subcomponents/Announcements/Announcements'
import Resources from '../subcomponents/Resources/Resources'
import Announcments from '../subcomponents/Announcements/Announcements'
import Journals from '../subcomponents/Journal/Journals'
import OnTheFloor from '../views/user/OnTheFloor'
import ThemeSwitch from '../subcomponents/ThemeSwitch/ThemeSwitch'

import { useDispatch } from 'react-redux'
import { clearLoggedInUser, updateLoggedInUser } from '../slices/user'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [currentTheme, setCurrentTheme] = useState(false) // get current from local storage
  const [test, setTest] = useState(false)

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

  useEffect(() => {
    console.log('useEffect!!!!')
    currentTheme
      ? localStorage.setItem('theme', 'light')
      : localStorage.setItem('theme', 'dark')
    setTest(!test)
  }, [currentTheme])

  return (
    <>
      <div className="dark">
        {/* <div className={`${currentTheme ? 'dark' : ''}`}> */}
        <div className="bg-vsblack dark:bg-white dark:text-black">
          <div className="bg-vsblack m-auto w-[357px]">
            <div className="flex flex-col justify-center w-auto text-center  text-vslightblue">
              {/* <ThemeSwitch
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
              /> */}
              <Nav />
              <Todos />
              <Announcments />
              <Resources />
              <OnTheFloor />
              <Journals />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
