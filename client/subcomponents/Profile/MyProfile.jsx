import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserProfileInfo } from '../../api/profiles'
import { useAuth0 } from '@auth0/auth0-react'

function MyProfile({ id }) {
  const [profilesInfo, setProfilesInfo] = useState([])
  const { logout } = useAuth0()

  async function getSpecificProfile(id) {
    try {
      const profInfo = await getUserProfileInfo()
      const singleProfile = profInfo.filter((profile) => {
        return profile.id == id
      })
      setProfilesInfo(singleProfile)
    } catch (error) {
      console.error(error.messages)
    }
  }

  function handleLogoff(e) {
    e.preventDefault()
    logout()
  }

  useEffect(() => {
    getSpecificProfile(id)
  }, [])

  //TODO Edit needs to be fixed
  return (
    <>
      <div className="bg-vslightblack rounded p-1.5 m-2 mt-1 hover:text-pink-800 hover:font-bold">
        <Link className="float-left text-vspink mx-2 my-1" to={`/cohort`}>
          Pōhutukawa Cohort
        </Link>
        <Link to="/" onClick={handleLogoff}>
          <button className="float-right text-vspink mx-2 my-1">
            {' '}
            Log Out{' '}
          </button>
        </Link>
      </div>
      {profilesInfo.map((profile) => {
        return (
          <h1 className="text-vslightblue" key={profile.id}>
            <div className="flex justify-center object-contain h-60 w-full">
              <img
                className="rounded-full mb-6 mt-20"
                // className="rounded-full object-contain h-48 w-full"
                src={profile.profile_picture}
                alt={`${profile.first_name}`}
              />
            </div>
            <div>
              {profile.first_name} {profile.last_name}
            </div>
            <div>{profile.pronouns}</div>
            <div>{profile.cohort}</div>

            <a
              href={profile.github_link}
              className="italic hover:text-sky-700 hover:font-bold"
            >
              {' '}
              My Github{' '}
            </a>
            <br />
            <br />
            <br />
            <div className="flex justify-center items-center">
              <Link className="italic" to={`/myprofile/edit`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 flex justify-center items-center hover:text-sky-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Link>
            </div>
          </h1>
        )
      })}
    </>
  )
}

export default MyProfile

//Edit profile
//Link to logout
//Suss out routes
//Match it to be own profile
