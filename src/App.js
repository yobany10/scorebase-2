import React from 'react'
import Navbar from './components/Navbar'
import Scorekeeper from './components/Scorekeeper'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import './App.css'

const App = () => {
  return (
      <div className='app'>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/scorekeeping' element={<Scorekeeper/>} />
          </Routes>
      </div>
  )
}

export default App