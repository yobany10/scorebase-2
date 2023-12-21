import React from 'react'
import ReactGA from 'react-ga4'
import Scorekeeper from './components/Scorekeeper'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './Auth/Login'
import Dashboard from './components/Dashboard'
import ViewQuiz from './components/ViewQuiz'
import { Routes, Route } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

const App = () => {
  
  const TRACKING_ID = 'G-RV5G16LQSR'
  ReactGA.initialize(TRACKING_ID)
  
  return (
      <div className='app'>
        <ToastContainer limit={2} />
        <Navbar />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/scorekeeping' element={<Scorekeeper/>} />
            <Route path='/viewquiz/:id' element={<ViewQuiz/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
          </Routes>
          <Footer />
      </div>
  )
}

export default App