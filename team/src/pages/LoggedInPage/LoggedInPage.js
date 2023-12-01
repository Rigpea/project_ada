import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoggedInPage = () => {
  const { user } = useAuth0();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

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
    <div>
      <h1>Welcome {userData.displayName}</h1>
      {/* Rest of your user's data and UI elements */}
    </div>
  );
};

export default LoggedInPage;
