import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserInfo from "../../components/UserInfo.js";
import './LoggedInPage.css';

const LoggedInPage = () => {
  const { user, logout } = useAuth0();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/check-user', { userId: user.sub });
        if (response.data.exists) {
          setUserData(response.data.userData);
          // User exists, proceed with setting up initial image etc.
        } else {
          navigate('/registration'); // Redirect to registration page
        }
      } catch (error) {
        console.error('Error checking user', error);
      }
    };

    if (user) {
      checkUser();
    }
  }, [user, navigate]);

  if (!userData) {
    return <div>Loading...</div>; // Or any other loading state
  }

  // Render user's data, initial image setup, etc.
  return (
    <div className="logged-in-container">
      <nav className="navigation-bar">
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
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LoggedInPage;
