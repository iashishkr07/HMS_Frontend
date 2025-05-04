// // src/pages/Profile.jsx
// // import { useAuth } from '../context/AuthContext';
// import { Link, useNavigate } from 'react-router-dom';
// import MyAppointments from './MyAppointments';

// const Profile = () => {
//   // const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // logout();
//     navigate('/');
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-sidebar">
//         <div className="user-info">
//           <h2>{user?.name || 'My Account'}</h2>
//           <p>{user?.email}</p>
//         </div>
        
//         <ul className="profile-menu">
//           <li><Link to="/profile">My Profile</Link></li>
//           <li><Link to="/my-appointments">My Appointments</Link></li>
//           <li><Link to="/settings">Settings</Link></li>
//           <li><button onClick={handleLogout} className="logout-link">Logout</button></li>
//         </ul>
//       </div>
      
//       <div className="profile-content">
//         {/* Default view shows appointments */}
//         <MyAppointments />
        
//         {/* Alternatively, you could use routes here */}
//         {/* <Routes>
//           <Route path="/profile" element={<UserProfile />} />
//           <Route path="/profile/appointments" element={<MyAppointments />} />
//         </Routes> */}
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React from 'react'

const Profile = () => {
  return (
    <div>Profile</div>
  )
}

export default Profile