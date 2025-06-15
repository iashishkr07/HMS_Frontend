import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Home1 from './pages/Home1';
import Doctors from './pages/Doctors';
import Doctors1 from './pages/Doctors1';
import About from './pages/About';
// import About1 from './pages/About1';
// import Contact from './pages/Contact';
// import Contact1 from './pages/Contact1';
import Profile from './pages/Profile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
// import AdminLogin from './components/AdminLogin';
import UserProfile from './components/UserProfile';
// import Navbar from './components/Navbar';
import BookAppointment from './components/BookAppointment';
import ServicesPage from './pages/ServicesPage';
import TimeTable from './components/TimeTable';
import DoctorProfile from './components/DoctorProfile';
import Emergency from './pages/Emergency';
import Contact from './pages/contact';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import DoctorList from './components/DoctorList';
import Login from './components/Login';
import ContactUs from './components/ContactUS';
import Admin from './pages/Admin';
import DoctorPage from './pages/DoctorPage';



const App = () => {
  return (
    <div >
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/loged' element={<Home1/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors1' element={<Doctors1/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />     
        <Route path='/doctors1/:speciality' element={<Doctors1/>} />     
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/admin-login' element={<Login />} />
        {/* <Route path="/admin-login" element={<AdminLogin />} /> */}
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='/Contact' element={<contact/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments/>} />
        <Route path='/appointment/:docId' element={<Appointment/>} />
        <Route path='/UserProfile' element={<UserProfile />} />
        <Route path='/bookappointment' element={<BookAppointment />} />
        <Route path='/servicespage' element={<ServicesPage />} />
        <Route path='/timetable' element={<TimeTable />} />
        <Route path='/doctors/profile' element={<DoctorProfile />} />
        <Route path="/doctor/:docId" element={<DoctorProfile />} />
        <Route path='/emergency' element={<Emergency />} />
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path='/doctor-list' element={<DoctorList />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/doctor' element={<DoctorPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
