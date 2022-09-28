import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUserProfileInfo } from '../../api/profiles'

function Profile() {
  const { id } = useParams()
  const [profilesInfo, setProfilesInfo] = useState([])

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

  useEffect(() => {
    getSpecificProfile(id)
  }, [])

  return (
    <>
      {profilesInfo.map((profile) => {
        return (
          <>
            <div className="bg-vslightblack">
              {profile.first_name} {profile.last_name}{' '}
            </div>
            <div className="flex justify-center">
              <img
                className="rounded-full"
                src={profile.profile_picture}
                alt={`${profile.first_name}`}
              />
            </div>
            <h1 className="text-vspink" key={profile.id}>
              <div>{profile.cohort}</div>
              <div>{profile.pronouns}</div>{' '}
              <div>
                <a href={profile.github_link}> Github </a>
              </div>
            </h1>
          </>
        )
      })}
    </>
  )
}

export default Profile

{
  /* <p>{profile.cohort}</p>
<p>{profile.pronouns}</p>
<p>{profile.github_link}</p>
<img src={profile.profile_picture} alt="" />
      */
}
