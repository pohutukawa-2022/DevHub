import React, { useEffect, useState } from 'react'
import { getAllResources, getResourcesByDate } from '../../api/resources'
import AddResource from './AddResource'

function Resources() {
  const [resources, setResources] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  // const [loading, setLoading] = useState(true)
  // const [error, setError] = useState('')

  // TODO: Change to today's date, now for testing purpose
  const testDate = new Date('October 4, 2022, 12:05:00')

  async function loadResources() {
    try {
      const allResources = await getResourcesByDate(testDate.toDateString())
      setResources(allResources)
    } catch (error) {
      console.error(error.message)
    }
    // setLoading(true)
    // setError('')
    // getAllResources()
    //   .then((resource) => setResources(resource))
    //   .finally(() => setLoading(false))
    //   .catch((err) => console.error(err.message))
  }

  function showAddButton() {
    setShowAdd(true)
  }

  useEffect(() => {
    loadResources()
  }, [resources])

  return (
    <div className="flex flex-col relative bg-vslightblack rounded p-1.5 m-2 mt-1 text-left">
      <span className="text-vsgreen">Resources:</span>
      <ul className="">
        {resources.map((resource) => {
          return (
            <li key={resource.id} className="flex align-middle w-1/2">
              <img src={`${resource.icon}`} className="w-12 h-8"></img>
              <a className="align-middle" href={resource.url}>
                {`${resource.description} (by ${resource.first_name})`}
              </a>
            </li>
          )
        })}
      </ul>
      <img
        src="images/addico.png"
        className="absolute top-2 right-1"
        onClick={showAddButton}
        alt="add"
      />
      {/* <button onClick={showAddButton}>Add</button> */}
      <AddResource showAdd={showAdd} setShowAdd={setShowAdd} />
    </div>
  )
}

export default Resources
