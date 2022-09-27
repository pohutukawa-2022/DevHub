import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { useCacheUser } from '../auth0-utils'
import Nav from './Nav'
import Home from '../views/Home'
import Index from '../views/Index'

function App() {
  useCacheUser()

  return (
    <>
      <div className="bg-vsblack">
        <div className="flex flex-col justify-center w-auto text-center  text-vslightblue">
          <Nav />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
