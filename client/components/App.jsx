<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
=======
import React, { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useCacheUser } from '../auth0-utils'
>>>>>>> theme-attempt
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

import { useDispatch, useSelector } from 'react-redux'
import { clearLoggedInUser, updateLoggedInUser } from '../slices/user'
import { useCacheUser } from '../auth0-utils'

function App() {
  useCacheUser()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState(new Date('September 7, 2022, 12:05:00'))
  const [user, setUser] = useState({})

  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  // const [currentTheme, setCurrentTheme] = useState(false) // get current from local storage
  // const [test, setTest] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearLoggedInUser())
    } else {
      getAccessTokenSilently()
        .then((token) => getUser(token))
        .then((userInDb) => {
          setUser(userInDb)
          userInDb
            ? dispatch(updateLoggedInUser(userInDb))
            : navigate('/register')
        })
        .finally(() => setLoading(false))
        .catch((err) => console.error(err))
    }
  }, [isAuthenticated])
  // useEffect(() => {
  //   currentTheme
  //     ? localStorage.setItem('theme', 'light')
  //     : localStorage.setItem('theme', 'dark')
  //   setTest(!test)
  // }, [currentTheme])

  return (
    <>
<<<<<<< HEAD
      <Nav />
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="dark">
          {/* <div className={`${currentTheme ? 'dark' : ''}`}> */}
          <div className="bg-vsblack dark:bg-white dark:text-black">
            <div className="bg-vsblack m-auto w-[357px]">
              <div className="flex flex-col justify-center w-auto text-center  text-vslightblue">
                {/* <ThemeSwitch
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
              /> */}
                <Nav date={date} setDate={setDate} />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Todos date={date} />
                        <Announcments id={user.id} date={date} />
                        <Resources id={user.id} date={date} />
                        <OnTheFloor />
                        <Journals id={user.id} date={date} />
                      </>
                    }
                  />
                  <Route
                    path="/myprofile"
                    element={<MyProfile id={user.id} />}
                  />
                  <Route path="/cohort" element={<Cohort />} />
                </Routes>
              </div>
            </div>
          </div>
=======
      <div className="bg-vsblack">
        <div className="flex flex-col justify-center w-auto text-center  text-vslightblue">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Nav />
                  <Todos />
                  <Announcments />
                  <Resources />
                  <OnTheFloor />
                  <Journal />
                </>
              }
            />
            <Route path="/:id/myprofile" element={<MyProfile />} />
            <Route path="/cohort" element={<Cohort />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
>>>>>>> theme-attempt
        </div>
      )}
    </>
  )
}

export default App
