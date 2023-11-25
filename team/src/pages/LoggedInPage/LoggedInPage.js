import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import UserInfo from "../../components/UserInfo.js";

const LoggedInPage = () => {
  // Destructure the logout function from the useAuth0 hook
  const { logout } = useAuth0();

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* Render the UserInfo component here */}
      <UserInfo />
      {/* Add a button to call the logout function */}
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Logout
      </button>
    </div>
  );
};

export default LoggedInPage;
