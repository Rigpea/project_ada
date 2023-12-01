import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <button onClick={navigateToLogin}>Login</button>
      <br />
      <button onClick={navigateToSignup}>Sign Up</button>
    </div>
  );
};

export default HomePage;
