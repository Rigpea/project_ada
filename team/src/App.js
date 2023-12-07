import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoggedInPage from './pages/LoggedInPage/LoggedInPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import BlockedPage from './pages/BlcokedPage/BlockedPage';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/register" element={<RegistrationPage.js/>} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/loggedIn" element={<LoggedInPage />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/registrationpage" element={<RegistrationPage/>} />
        <Route path="/blockedpage" element={<BlockedPage/>} />
      </Routes>
    </Router>
  );
};

export default App;

