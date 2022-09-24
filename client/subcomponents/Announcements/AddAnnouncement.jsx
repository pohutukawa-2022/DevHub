import React, { useState } from 'react'
import { addAnnouncement } from '../../api/announcements'

function AddAnnouncement(props) {
  const showAdd = props.showAdd

  // TODO: Change to today's date, now for testing purpose
  const testDate = new Date('October 3, 2022, 12:05:00')

  const [form, setForm] = useState({
    description: '',
    url: '',
    icon: '',
    date: testDate, // TODO: Change to today's date
    user_id: 2, // TODO: import current USER_ID
  })

  async function handleAddAnnouncementButton(e) {
    e.preventDefault()
    await addAnnouncement(form)
    props.setShowAdd(false)
    setForm({
      message: '',
      url: '',
      date: testDate, // TODO: Change to today's date
      user_id: 2, // TODO: import current USER_ID
    })
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <form
      className={`${showAdd ? '' : 'hidden'} bg-red-500`}
      onSubmit={handleAddAnnouncementButton}
    >
      <label>
        <span>Description:</span>
        <input
          type="text"
          name="message"
          onChange={handleChange}
          value={form.message}
        ></input>
      </label>
      <label>
        <span>URL:</span>
        <input
          type="text"
          name="url"
          onChange={handleChange}
          value={form.url}
        ></input>
      </label>
      <button>Add Announcement</button>
    </form>
  )
}

export default AddAnnouncement
