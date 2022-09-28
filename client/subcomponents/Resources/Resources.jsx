import React, { useEffect, useState } from 'react'
import { getAllResources, getResourcesByDate } from '../../api/resources'
import AddResource from './AddResource'

function Resources({ id, date }) {
  const [resources, setResources] = useState([])
  const [showAdd, setShowAdd] = useState(false)

  async function loadResources() {
    try {
      const allResources = await getResourcesByDate(Date.parse(date))
      setResources(allResources)
    } catch (error) {
      console.error(error.message)
    }
  }

  function showAddButton() {
    setShowAdd(!showAdd)
  }

  useEffect(() => {
    loadResources()
  }, [date])

  function isUsers(id) {
    if (id == resources.user_id) return true
    else return false
  }

  return (
    <div className="flex flex-col relative bg-vslightblack rounded p-2 pl-3.5 m-2 mt-1 text-left">
      <span className="text-vsgreen text-lg">Resources:</span>
      <ul>
        {resources.map((resource) => {
          return (
            <li key={resource.id} className="flex">
              <a className="" href={resource.url}>
                <img
                  src={`${resource.icon}`}
                  className="inline w-4  mr-2 mb-1 "
                  alt="ico"
                />
                {`${resource.description} (by ${resource.first_name})`}
                <img
                  src="../images/deleteico.png"
                  className={`inline ml-2 mb-1 w-4 ${
                    !isUsers(resource.user_id) ? 'hidden' : ''
                  }`}
                  alt="delete"
                />
              </a>
            </li>
          )
        })}
      </ul>
      <img
        src="../images/addico.png"
        className="absolute w-7 top-2 right-1"
        onClick={showAddButton}
        alt="add"
      />
      {/* <button onClick={showAddButton}>Add</button> */}
      <AddResource
        loadResources={loadResources}
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        id={id}
        date={date}
      />
    </div>
  )
}

export default Resources
