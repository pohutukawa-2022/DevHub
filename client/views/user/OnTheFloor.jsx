import React from 'react'

function OnTheFloor(props) {
  return (
    <div className="flex flex-col relative bg-vslightblack rounded p-2 pl-3.5 m-2 mt-1 text-left">
      <span className="text-vsgreen text-lg">On the floor now:</span>
      <div className="flex flex-row">
        <img
          src="../images/ahmad.jfif "
          className="rounded-full w-20 m-1"
          alt="onthefloor"
        />
        <img
          src="../images/clem.jfif "
          className="rounded-full w-20 m-1"
          alt="onthefloor"
        />
        <img
          src="../images/alex.jfif "
          className="rounded-full w-20 m-1"
          alt="onthefloor"
        />
      </div>
    </div>
  )
}

export default OnTheFloor
