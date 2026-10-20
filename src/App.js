import React from 'react'
import ReactGA from 'react-ga4'
import Scorekeeper from './components/Scorekeeper'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NamePrompt from './Profile/NamePrompt'
import Profile from './Profile/Profile'
import ProfileRoute from './Profile/ProfileRoute'
import Dashboard from './components/Dashboard'
import ViewQuiz from './components/ViewQuiz'
import { Navigate, Routes, Route } from 'react-router-dom'
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
            <Route path='/welcome' element={<NamePrompt/>} />
            <Route path='/profile' element={<ProfileRoute><Profile/></ProfileRoute>} />
            <Route path='/scorekeeping' element={<ProfileRoute><Scorekeeper/></ProfileRoute>} />
            <Route path='/viewquiz/:id' element={<ProfileRoute><ViewQuiz/></ProfileRoute>} />
            <Route path='/dashboard' element={<ProfileRoute><Dashboard/></ProfileRoute>} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
          <Footer />
      </div>
  )
}

export default App