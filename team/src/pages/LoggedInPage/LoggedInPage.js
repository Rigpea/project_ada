import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import UserInfo from "../../components/UserInfo.js";

import './LoggedInPage.css';
import Navbar from "../../components/navbar.js";



const LoggedInPage = () => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [blockedSites, setBlockedSites] = useState([]);
  const [newSite, setNewSite] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [displayName, setDisplayName] = useState([]);


 
const [blockedSitesResponse, setBlockedSitesResponse] = useState('');

const fetchBlockedSites = async () => {
  setIsLoading(true);
  try {
    const response = await fetch(`http://localhost:8080/get_blocked_sites?user_id=${encodeURIComponent(user.sub)}`);
    if (response.ok) {
      const data = await response.text(); // Assuming the response is a string
      setBlockedSitesResponse(data); // Set the response data to the state variable
    }
  } catch (error) {
    console.error('Error fetching blocked sites:', error);
  } finally {
    setIsLoading(false);
  }
};
useEffect(() => {
  if (user && user.sub) {
    fetchBlockedSites();
  }
}, [user]);
const fetchDisplayName = async () => {
  setIsLoading(true);
    try {
    const response = await fetch(`http://localhost:8080/get_display_name?user_id=${encodeURIComponent(user.sub)}`);
    if (response.ok) {
      const data = await response.text(); // Assuming the response is a string
      setDisplayName(data); // Set the response data to the state variable
    }
  } catch (error) {
    console.error('Error fetching blocked sites:', error);
  } finally {
    setIsLoading(false);
  }
};
useEffect(() => {
  if (user && user.sub) {
    fetchDisplayName();
  }
}, [user]);

  const handleAddSite = async () => {
  if (!user) return "no user";  // Check if user exists
  setIsLoading(true);
  try {
    await fetch('http://localhost:8080/add_blocked_site', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id: user.sub, url: newSite }) // Sending user_id and new site URL
    });
    setNewSite('');
    fetchBlockedSites();  // Refresh the list
  } catch (error) {
    console.error('Error adding blocked site:', error);
  } finally {
    setIsLoading(false);
  }
};
useEffect(() => {
  if (user && user.sub) {
    handleAddSite();
  }
}, [user]);

  const handleDeleteSite = async () => {
    if (!user) return;  // Add this check to prevent the error
    setIsLoading(true);
    try {
      await fetch('http://localhost:8080/delete_blocked_site', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.sub })
      });
      fetchBlockedSites();  // Refresh the list
    } catch (error) {
      console.error('Error deleting blocked sites:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
      <Navbar/>
      <div className="content">
        <h1>Welcome {displayName}</h1>
        <UserInfo />
        <p id="welcom-message">Lets Get Productive</p>
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </button>
      </div>
          <div className="Blocked">
      <h1>Blocked Sites</h1>
     
      {isLoading ? <p>Loading...</p> : (
        <>
         
          <input
            type="text"
            value={newSite}
            onChange={(e) => setNewSite(e.target.value)}
            placeholder="Enter site URL"
          />
          <button onClick={handleAddSite}>Add Site</button>
          <button onClick={handleDeleteSite}>Delete All Sites</button>
          <ul>
            {blockedSites.map((site, index) => (
              <li key={index}>{site}</li>
            ))}
          </ul>
        </>
      )}
      <div>
      <h2>These Sites Waste Time. You are all you need!</h2>
      <p>{blockedSitesResponse}</p> {/* This will display the response */}
    </div>
    </div>

    </div>
  );
};

export default LoggedInPage;
