import React, { useEffect, useState } from 'react'
import { getJournalByIdNDate, addJournalByIdNDate } from '../../api/journal'

function Journals() {
  // TODO: remove testId and import from useParams
  const testId = 2
  const testDate = new Date('September 6, 2022, 12:05:00')

  const [showAdd, setShowAdd] = useState(false)
  const [journal, setJournal] = useState([])
  const [newJournal, setNewJournal] = useState({
    user_id: testId,
    date: testDate,
    content: ''
  })

  async function getJournal() {
    const journal1 = await getJournalByIdNDate(testId, Date.parse(testDate))
    console.log(journal1)
    setJournal(journal1)
  }

  useEffect(() => {
    getJournal()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setShowAdd(!showAdd)
    setNewJournal({ ...newJournal, content: '' })
    getJournal()
    await addJournalByIdNDate(newJournal)
  }

  function handleJournal(e) {
    const { name, value } = e.target
    setNewJournal({ ...newJournal, [name]: value })
  }

  function showAddButton() {
    setShowAdd(!showAdd)
  }

  return (
    <>
      <div className="flex flex-col relative bg-vslightblack rounded p-2 pl-3.5 m-2 mt-1 text-left">
        <span className="text-vspink">My journal:</span>
        <ul>
          {journal.map((journal) => {
            return <li key={journal.id}>{journal.content}</li>
          })}
        </ul>
        <img
          src="images/addico.png"
          className="absolute w-7 top-2 right-1"
          alt="add"
          onClick={showAddButton}
        />
        <form className={showAdd ? '' : 'hidden'}>
          <textarea
            className={`form-control block w-full px-3 py-1.5 text-base font-normal
        text-black
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-black focus:bg-white focus:border-blue-600 focus:outline-none
      `}
            rows="6"
            onChange={handleJournal}
            name="content"
            value={newJournal.content}
          ></textarea>
          <button onClick={handleSubmit}>Add Entry</button>
        </form>
      </div>
    </>
  )
}

export default Journals
