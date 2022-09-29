import React, { useState, useEffect } from 'react'
import { useNavigate, redirect } from 'react-router-dom'
import { getUserProfileInfo, editProfile } from '../../api/profiles'

export default function EditMyProfile({ id }) {
  const [profilesInfo, setProfilesInfo] = useState([])
  const navigate = useNavigate()

  async function getSpecificProfile(id) {
    try {
      const profInfo = await getUserProfileInfo()
      const singleProfile = profInfo.filter((profile) => {
        return profile.id == id
      })
      setProfilesInfo(singleProfile[0])
    } catch (error) {
      console.error(error.messages)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setProfilesInfo({ ...profilesInfo, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    await editProfile(profilesInfo)
    return navigate('/1234')
  }

  useEffect(() => {
    getSpecificProfile(id)
  }, [])

  return (
    <form>
      <img
        src={profilesInfo.profile_picture}
        alt={`${profilesInfo.first_name}`}
      />
      <label>First Name</label>
      <input
        type="text"
        name="first_name"
        value={profilesInfo.first_name}
        onChange={handleChange}
      ></input>
      <label>Last Name</label>
      <input
        type="text"
        name="last_name"
        value={profilesInfo.last_name}
        onChange={handleChange}
      ></input>
      <label>Cohort</label>
      <select className="cohort" onChange={handleChange}>
        <option name="cohort" value="Pohutakawa">
          Pōhutukawa
        </option>
        <option value="Roa">Roa</option>
        <option value="Matai">Matai</option>
        <option value="Mako">Mako</option>
        <option value="null">Facilitator</option>
      </select>
      <label>Pronouns</label>
      <input
        type="text"
        name="pronouns"
        value={profilesInfo.pronouns}
        onChange={handleChange}
      ></input>
      <label>Github Link</label>
      <input
        type="text"
        name="github_link"
        value={profilesInfo.github_link}
        onChange={handleChange}
      ></input>
      <label>Profile Image URL</label>
      <input
        type="text"
        name="profile_picture"
        value={profilesInfo.profile_picture}
        onChange={handleChange}
      ></input>
      <button onClick={handleSubmit}>Save Changes</button>
    </form>
  )
}
