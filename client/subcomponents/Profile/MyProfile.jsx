import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getUserProfileInfo } from '../../api/profiles'

function MyProfile() {
  const { id } = useParams()
  console.log(id)
  const [profilesInfo, setProfilesInfo] = useState([])

  async function getSpecificProfile(id) {
    try {
      const profInfo = await getUserProfileInfo()
      const singleProfile = profInfo.filter((profile) => {
        console.log(profile.id)
        return profile.id == id
      })
      console.log(singleProfile)
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
      <h1> My Profile </h1>
      <Link to={`/cohort`}> Cohort </Link>
      <button> Log Out </button>
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

export default MyProfile

//Edit profile
//Link to logout
//Suss out routes
//Match it to be own profile
