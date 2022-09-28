import React, { useState } from 'react'
import { addResource } from '../../api/resources'

function AddResource(props) {
  const showAdd = props.showAdd

  // TODO: Change to today's date, now for testing purpose
  const testDate = new Date('September 7, 2022, 12:05:00')

  const [form, setForm] = useState({
    description: '',
    url: '',
    icon: '',
    date: testDate, // TODO: Change to today's date
    user_id: 2, // TODO: import current USER_ID
  })

  async function handleAddResourceButton(e) {
    e.preventDefault()
    await addResource(form)
    props.setShowAdd(false)
    setForm({
      description: '',
      url: '',
      icon: '',
      date: testDate, // TODO: Change to today's date
      user_id: 2, // TODO: import current USER_ID
    })
    props.loadResources()
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <form
      className={`${showAdd ? '' : 'hidden'} bg-black-500 `}
      onSubmit={handleAddResourceButton}
    >
      <label>
        <span>Description: </span>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={form.description}
          className="text-vsblack  rounded w-2/6"
          placeholder="  Add your description here"
        ></input>
      </label>
      <label>
        <span> URL: </span>
        <input
          type="text"
          name="url"
          onChange={handleChange}
          value={form.url}
          className="text-vsblack  rounded w-1/6"
          placeholder="  Add url here"
        ></input>
      </label>
      <label>
        <span> Icon: </span>
        <input
          type="text"
          name="icon"
          onChange={handleChange}
          value={form.icon}
          className="text-vsblack  rounded w-1/6"
        ></input>
      </label>
      <button className="inline ml-2 absolute right-1 bottom-1">
        Add Resources
      </button>
    </form>
  )
}

export default AddResource
