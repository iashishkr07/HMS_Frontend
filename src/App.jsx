import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
// import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import AdminLogin from './components/AdminLogin';
// import Navbar1 from './components/Navbar1';

const App = () => {
  return (
    <div >
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />     
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/my-appointments' element={<MyAppointments/>} />
        <Route path='/appointment/docId' element={<Appointment/>} />
      </Routes>
    </div>
  )
}

export default App;
