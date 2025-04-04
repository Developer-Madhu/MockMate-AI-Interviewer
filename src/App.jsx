import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Auth/Login'
import Interview from './Pages/Interview/Interview'
import Register from './Pages/Auth/Register'
import { AuthProvider } from './Pages/Auth/AuthContext'
import QuestionHistory from './Pages/Interview/QuestionHistory'
import Dashboard from './Pages/Interview/Dashboard'
import SettingsPage from './Components/SettingsPage'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<Login />} path='/login' />
          <Route element={<Register />} path='/register' />
          <Route element={<QuestionHistory />} path='/yourhistory' />
          <Route element={<Dashboard />} path='/dashboard' />
          <Route element={<SettingsPage />} path='/settings' />
          <Route element={<Interview />} path='/interview' />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App