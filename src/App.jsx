import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Auth/Login'
import Interview from './Pages/Interview/Interview'
import Register from './Pages/Auth/Register'
import Dashboard from './Pages/Interview/Dashboard'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<HomePage/>} path='/'/>
      <Route element={<Login/>} path='/login'/>
      <Route element={<Register/>} path='/register'/>
      <Route element={<Dashboard/>} path='/dashboard'/>
    </Routes>
    </BrowserRouter>
  )
}

export default App