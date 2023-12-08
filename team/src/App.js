import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoggedInPage from './pages/LoggedInPage/LoggedInPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import BlockedPage from './pages/BlcokedPage/BlockedPage';
import Recommendations from './pages/Recommendations/Recommendations';
import Points from './pages/PointsPage/PointsPage';
import Tasks from './pages/TasksPage/TasksPage';


const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/register" element={<RegistrationPage.js/>} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/loggedinpage" element={<LoggedInPage />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/registrationpage" element={<RegistrationPage/>} />
        <Route path="/recommendations" element={<Recommendations/>}/>
        <Route path="/blockedpage" element={<BlockedPage/>} />
        <Route path="/points" element={<Points/>}/>
        <Route path="/tasks" element={<Tasks/>}/>
      </Routes>
    </Router>
  );
};

export default App;

