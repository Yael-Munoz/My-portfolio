import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import UserLogin from './components/user_login/UserLogin.jsx';
import UserRegister from './components/user_register/UserRegister.jsx';
import UserHome from './components/user_home/UserHome.jsx';
import './App.css'

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/home" element={<UserHome />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
