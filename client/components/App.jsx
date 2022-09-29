import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router-dom'
import { useCacheUser } from '../auth0-utils'
import { useAuth0 } from '@auth0/auth0-react'
import { getUser } from '../api/api'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import Nav from './Nav'
import Cohort from './Cohort'
import Profile from '../subcomponents/Profile/Profile'
import MyProfile from '../subcomponents/Profile/MyProfile'
import EditMyProfile from '../subcomponents/Profile/EditMyProfile'
import Todos from '../subcomponents/Todos/Todos'

import Announcements from '../subcomponents/Announcements/Announcements'
import Resources from '../subcomponents/Resources/Resources'
import Journals from '../subcomponents/Journal/Journals'
import OnTheFloor from '../views/user/OnTheFloor'

import { useDispatch, useSelector } from 'react-redux'
import { clearLoggedInUser, updateLoggedInUser } from '../slices/user'

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

  const { logout, loginWithRedirect } = useAuth0()

  function handleSignIn(e) {
    e.preventDefault()
    loginWithRedirect({
      scope: 'role:member'
    })
  }

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
      <nav>
        <IfAuthenticated>
          <div className="dark">
            {/* <div className={`${currentTheme ? 'dark' : ''}`}> */}
            <div className="bg-vsblack dark:bg-white dark:text-black">
              <div className="bg-vsblack m-auto w-[357px] min-h-screen h-full">
                <div className="flex flex-col justify-center w-auto text-center  text-vslightblue">
                  {/* <ThemeSwitch
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
              /> */}
                  {loading ? (
                    <div className="min-h-full mt-32">
                      <img src="../images/eli.png" className="min-h-full" />
                      <h1 className="text-4xl">LOADING</h1>
                    </div>
                  ) : (
                    <>
                      <Nav date={date} setDate={setDate} />
                      <Routes>
                        <Route
                          path="/"
                          element={
                            <>
                              <Todos date={date} />
                              <Announcements id={user.id} date={date} />
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
                        <Route
                          path="/myprofile/edit"
                          element={<EditMyProfile id={user.id} />}
                        />
                      </Routes>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link to="/" onClick={handleSignIn}>
            Sign In
          </Link>
        </IfNotAuthenticated>
      </nav>
    </>
  )
}

export default App
