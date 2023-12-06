
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import UserInfo from "../../components/UserInfo.js";
import Test from "../../components/test.js";
import './LoggedInPage.css';

const LoggedInPage = () => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const checkRegistration = () => {
      if (user) {
        const url = `http://localhost:8080/checkUserStatus?email=${encodeURIComponent(user.email)}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setIsRegistered(data.isRegistered);

            // Navigate to registration page if the user is not registered
            if (!data.isRegistered) {
              navigate('/registrationPage');
            }
          })
          .catch(error => {
            console.error('Error checking registration status', error);
          });
      }
    };

    checkRegistration();
  }, [user, navigate]);

  return (
    <div className="logged-in-container">
      <nav className="navigation-bar">
        {/* Navigation items */}
        <ul>
          <li><a href="/loggedinpage">Home</a></li>
          <li><a href="/tasks">Tasks</a></li>
          <li><a href="/points">Points</a></li>
          <li><a href="/recommendations">Recommendations</a></li>
          <li><a href="/profilepage">Profile</a></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Welcome to the Loggedin Page</h1>
        <UserInfo />
        <Test/>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LoggedInPage;
