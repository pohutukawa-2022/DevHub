import React from 'react'
import TimeLine from './TimeLine'

function AdminOnTheFloorEach(props) {
  const timePeriods = props.facilitator
  console.log(timePeriods)
  // get user by id

  return (
    <>
      <div>
        {/* picture of the facilitator */}
        <TimeLine timePeriods={timePeriods} />
      </div>
    </>
  )
}

export default AdminOnTheFloorEach
