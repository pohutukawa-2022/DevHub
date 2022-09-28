import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../api/cohort'
import { Link } from 'react-router-dom'

function Cohort() {
  const [profiles, setProfiles] = useState([])

  async function getProfiles() {
    try {
      const prof = await getUserProfile()
      setProfiles(prof)
    } catch (error) {
      console.error(error.messages)
    }
  }

  useEffect(() => {
    getProfiles()
  }, [])

  // Make My Profile link dynamic
  return (
    <>
      <div className="bg-vslightblack rounded p-1.5 m-2 mt-1 hover:text-pink-800 hover:font-bold">
        <h1 className="text-vspink float-right">Pōhutukawa 2022</h1>
        <Link className="float-left text-vspink" to={`/myprofile`}>
          My Profile
        </Link>
      </div>

      <ul>
        {profiles.map((profile) => {
          return (
            <p className="hover:text-sky-700 hover:font-bold" key={profile.id}>
              {profile.first_name} {profile.last_name}
              <Link to={`/${profile.id}/myprofile`}>
                <div className="flex justify-center">
                  <img
                    className="rounded-full w-20 m-2 justify-center mb-6"
                    src={profile.profile_picture}
                    alt={`${profile.first_name}`}
                  />
                </div>
              </Link>
            </p>
          )
        })}
      </ul>
    </>
  )
}

export default Cohort
