import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login-page' element={<Login />} />
        <Route path='/signup-page' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App