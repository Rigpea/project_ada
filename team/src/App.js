import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoggedInPage from './pages/LoggedInPage/LoggedInPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Recommendations from './pages/Recommendations/Recommendations'

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/loggedIn" element={<LoggedInPage />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </Router>
  );
};

export default App;

