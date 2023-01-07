import React from 'react'
import Navbar from './components/Navbar'
import Scorekeeper from './components/Scorekeeper'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {
  return (
      <div className='app'>
        <ToastContainer limit={2} />
        <Navbar />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/scorekeeping' element={<Scorekeeper/>} />
          </Routes>
      </div>
  )
}

export default App