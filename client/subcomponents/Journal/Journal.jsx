import React, { useEffect, useState } from 'react'
import { getJournalByIdNDate, updateJournalByIdNDate } from '../../api/journal'

function Journal() {
  // TODO: remove testId and import from useParams
  const testId = 2
  const testDate = new Date('September 6, 2022, 12:05:00')

  const [journal, setJournal] = useState({})

  async function getJournal() {
    const journal1 = await getJournalByIdNDate(testId, Date.parse(testDate))
    setJournal(journal1)
  }

  useEffect(() => {
    getJournal()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    updateJournalByIdNDate(testId, testDate, journal)
  }

  function handleJournal(e) {
    setJournal({ ...journal, content: e.target.value })
  }

  return (
    <>
      <div className="flex flex-col relative bg-vslightblack rounded p-1.5 m-2 mt-1 text-left">
        <span className="text-vspink">My journal:</span>
        <form>
          <textarea
            className="form-control block w-full px-3 py-1.5 text-base font-normal
        text-black
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-black focus:bg-white focus:border-blue-600 focus:outline-none
      "
            rows="6"
            value={journal.content}
            onChange={handleJournal}
          ></textarea>
          <button onClick={handleSubmit}>Update Journal</button>
        </form>
      </div>
    </>
  )
}

export default Journal
