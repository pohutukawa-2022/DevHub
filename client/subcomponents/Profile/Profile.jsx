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
          <h1 key={profile.id}>
            {profile.first_name} {profile.last_name} {profile.cohort}
            {profile.pronouns} <a href={profile.github_link}> Github </a>
            <img src={profile.profile_picture} alt={`${profile.first_name}`} />
          </h1>
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
