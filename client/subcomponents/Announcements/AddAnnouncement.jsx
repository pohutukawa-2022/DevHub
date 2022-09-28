import React, { useState } from 'react'
import { addAnnouncement } from '../../api/announcements'

function AddAnnouncement(props) {
  const showAdd = props.showAdd

  const [form, setForm] = useState({
    message: '',
    url: '',
    date: props.date, // TODO: Change to today's date
    user_id: Number(props.id) // TODO: import current USER_ID
  })

  async function handleAddAnnouncementButton(e) {
    e.preventDefault()
    await addAnnouncement(form)
    props.setShowAdd(false)
    setForm({
      message: '',
      url: '',
      date: testDate, // TODO: Change to today's date
      user_id: 2 // TODO: import current USER_ID
    })
    props.loadAnnouncements()
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
        <span>
          <br /> Message:{' '}
        </span>

        <input
          type="text"
          name="message"
          onChange={handleChange}
          value={form.message}
        ></input>
      </label>
      <label>
        <span>
          <br />
          <br /> URL:
        </span>
        <input
          type="text"
          name="url"
          onChange={handleChange}
          value={form.url}
        ></input>
      </label>
      <button>
        <br /> Add{' '}
      </button>
    </form>
  )
}

export default AddAnnouncement
