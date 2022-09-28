import React from 'react'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Todos from '../subcomponents/Todos/Todos'

function Nav() {
  const user = useSelector((state) => state.user)

  const { logout, loginWithRedirect } = useAuth0()
  function handleLogoff(e) {
    e.preventDefault()
    logout()
  }

  function handleSignIn(e) {
    e.preventDefault()
    loginWithRedirect({
      scope: 'role:member'
    })
  }

  return (
    <>
      <div className="flex relative bg-vslightblack rounded p-1.5 m-2 mt-5 align-middle">
        <div className="pt-3 text-2xl text-vsgrey font-black content-center">
          &lt;
        </div>
        <div className="flex flex-col justify-center w-auto text-center">
          <span className="flex m-auto text-sm text-vsdarkblue text-center">
            Wed
          </span>
          <span className="flex  w-auto m-auto text-vsbrightgreen text-lg text-center">
            <span className="-mt-1">7</span>
          </span>
          <span className="flex m-auto -mt-1 text-sm text-vsbrightgreen">
            September
          </span>
        </div>
        <div className="pt-3 text-2xl text-vsgrey font-black content-center">
          &gt;
        </div>
        <div className="pt-5 ml-5 content-center">
          Hello, {user.first_name}!
        </div>
        <div className="w-16 absolute right-0 top-0">
          <Link to="/" onClick={handleLogoff}>
            <img className="rounded-full " src={user.profile_picture} alt="" />
          </Link>
        </div>

        <nav>
          <IfAuthenticated>
            <Link to="/" onClick={handleLogoff}>
              Log off
            </Link>
          </IfAuthenticated>
          <IfNotAuthenticated>
            <Link to="/" onClick={handleSignIn}>
              Sign In
            </Link>
          </IfNotAuthenticated>
        </nav>
      </div>
    </>
  )
}

export default Nav
