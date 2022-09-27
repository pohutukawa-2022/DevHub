import React from 'react'
import AdminOnTheFloorEach from './AdminOnTheFloorEach'

function AdminOnTheFloor() {
  const facilitator = [
    { id: 1, timestart: 10.25, timefinish: 12 },
    { id: 1, timestart: 14.5, timefinish: 17.75 }, // time 10:15 would be a number 10.25
  ]

  return (
    <>
      <div>
        <p>On The Floor</p>
        <AdminOnTheFloorEach key={facilitator.id} facilitator={facilitator} />
      </div>
    </>
  )
}

export default AdminOnTheFloor
