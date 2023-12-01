import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import UserInfo from "../../components/UserInfo.js";
import './LoggedInPage.css';

const LoggedInPage = () => {
  const { logout } = useAuth0();

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
