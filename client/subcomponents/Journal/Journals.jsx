import React, { useEffect, useState } from 'react'
import { getJournalByIdNDate, addJournalByIdNDate } from '../../api/journal'

function Journals({ id, date }) {
  const [showAdd, setShowAdd] = useState(false)
  const [journal, setJournal] = useState([])
  const [newJournal, setNewJournal] = useState({
    user_id: id,
    date: date,
    content: ''
  })

  async function getJournal() {
    const journal1 = await getJournalByIdNDate(id, Date.parse(date))
    setJournal(journal1)
  }

  useEffect(() => {
    getJournal()
    setNewJournal((newJournal) => ({ ...newJournal, date: date }))
  }, [date])

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await addJournalByIdNDate(newJournal)
      showAddButton()
      setNewJournal({ ...newJournal, content: '' })
      getJournal()
    } catch (error) {
      console.error(error)
    }
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
          src="../images/addico.png"
          className="absolute w-7 top-2 right-1"
          alt="add"
          onClick={showAddButton}
        />
        <form className={showAdd ? '' : 'hidden'}>
          <textarea
            className={`w-5/6 form-control block w-full px-3 py-1.5 text-base font-normal
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
          <img
            src="../images/addico.png"
            className="inline ml-2 absolute right-2 bottom-3"
            alt="add"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </>
  )
}

export default Journals
