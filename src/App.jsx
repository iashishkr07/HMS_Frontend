import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Home1 from './pages/Home1';
import Doctors from './pages/Doctors';
import Doctors1 from './pages/Doctors1';
import About from './pages/About';
import Contact from './pages/contact'; // Page version
import Profile from './pages/Profile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import ServicesPage from './pages/ServicesPage';
import Emergency from './pages/Emergency';
import Admin from './pages/Admin';
import DoctorPage from './pages/DoctorPage';

// Components
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import UserProfile from './components/UserProfile';
import BookAppointment from './components/BookAppointment';
import TimeTable from './components/TimeTable';
import DoctorProfile from './components/DoctorProfile';
import ContactUS from './components/ContactUS'; 
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import DoctorList from './components/DoctorList';
import Login from './components/Login';

const App = () => {
  return (
    <div>
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/loged' element={<Home1 />} />

        
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors1' element={<Doctors1 />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/doctors1/:speciality' element={<Doctors1 />} />
        <Route path='/doctors/profile' element={<DoctorProfile />} />
        <Route path="/doctor/:docId" element={<DoctorProfile />} />
        <Route path='/doctor' element={<DoctorPage />} />

        
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/admin-login' element={<Login />} />

        
        <Route path='/about' element={<About />} />
        <Route path='/Contact' element={<Contact />} />  
        <Route path='/contact' element={<ContactUs />} /> 
        <Route path='/profile' element={<Profile />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/bookappointment' element={<BookAppointment />} />
        <Route path='/servicespage' element={<ServicesPage />} />
        <Route path='/timetable' element={<TimeTable />} />
        <Route path='/emergency' element={<Emergency />} />
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path='/doctor-list' element={<DoctorList />} />
        <Route path='/admin' element={<Admin />} />

        
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
