import React from 'react'
import { Route, Routes } from 'react-router-dom'
// import Login from './pages/Login'
// import Signup from './pages/Signup'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App