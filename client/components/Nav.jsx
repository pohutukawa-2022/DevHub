import React from 'react'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'

function Nav(props) {
  const user = useSelector((state) => state.user)
  const day = moment(props.date).format('ddd')
  const month = moment(props.date).format('MMMM')
  const date = moment(props.date).format('DD')
  const nextDay = moment(props.date).add(1, 'day').toDate()
  const previousDay = moment(props.date).add(-1, 'day').toDate()

  return (
    <>
      <div className="flex relative bg-vslightblack rounded p-1.5 m-2 mt-5 align-middle">
        <div className="pt-3 text-2xl text-vsgrey font-black content-center">
          <button onClick={() => props.setDate(previousDay)}>&lt;</button>
        </div>

        <div className="flex flex-col justify-center w-auto text-center">
          <span className="flex m-auto text-sm text-vsdarkblue text-center">
            {day}
          </span>
          <span className="flex  w-auto m-auto text-vsbrightgreen text-lg text-center">
            <span className="-mt-1">{date}</span>
          </span>
          <span className="flex m-auto -mt-1 text-sm text-vsbrightgreen">
            {month}
          </span>
        </div>
        <div className="pt-3 text-2xl text-vsgrey font-black content-center">
          <button onClick={() => props.setDate(nextDay)}>&gt;</button>
        </div>
        <Link to="/">
          <div className="pt-5 ml-5 content-center">
            Hello, {user.first_name}!
          </div>
        </Link>
        <div className="w-16 absolute right-0 top-0">
          <Link to="/myprofile">
            <img className="rounded-full " src={user.profile_picture} alt="" />
          </Link>
        </div>
      </div>
    </>
  )
}

export default Nav
