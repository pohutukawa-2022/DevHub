export default Announcements
import React, { useState, useEffect } from 'react'
import AddAnnouncement from './AddAnnouncement'
import {
  deleteAnnouncement,
  getAnnouncementsByDate,
} from '../../api/announcements'

function Announcements() {
  const [announcements, setAnnouncements] = useState([])
  const [showAdd, setShowAdd] = useState(false)

  //TO DO make date dynamic
  const testDate = new Date('September 7, 2022, 12:05:00')

  async function loadAnnouncements() {
    try {
      const allAnnouncements = await getAnnouncementsByDate(
        Date.parse(testDate)
      )
      setAnnouncements(allAnnouncements)
    } catch (error) {
      console.error(error.message)
    }
  }

  function showAddButton() {
    setShowAdd(true)
  }

  useEffect(() => {
    loadAnnouncements()
  }, [])

  function handelDelete(id) {
    deleteAnnouncement(id)
      .then(() => loadAnnouncements())
      .catch(() => {})
  }

  return (
    <div className="flex flex-col relative bg-vslightblack rounded p-1.5 m-2 mt-1 text-left">
      {/* <span className="text-vspink">Announcements:</span> */}
      <ul className="text-vsorange">
        {announcements.map((announcement) => {
          return (
            <>
              {' '}
              <li key={announcement.id} className="flex text-vsorange">
                <a className="" href={announcement.url}>
                  <img
                    src="images/annico.png"
                    className="inline mr-2 mb-1 w-4"
                    alt="add"
                  />
                  {`${announcement.message}`}
                </a>
                {/* <button
                className="text-red-700"
                onClick={() => handelDelete(announcement.id)}
              >
                DELETE
              </button> */}
              </li>
            </>
          )
        })}
      </ul>

      {/* <button onClick={showAddButton}>Add</button> */}
      <AddAnnouncement
        loadAnnouncements={loadAnnouncements}
        showAdd={showAdd}
        setShowAdd={setShowAdd}
      />
    </div>
  )
}
