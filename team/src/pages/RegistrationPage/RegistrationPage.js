import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [blockedSites, setBlockedSites] = useState('');

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/add_basic_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.sub,
          email: user.email,
          display_name: displayName,
          hobbies: hobbies.split(',').map(hobby => hobby.trim()), // Assuming hobbies are comma-separated
          blocked_sites: blockedSites.split(',').map(site => site.trim()) // Assuming blocked sites are comma-separated
        })
      });
      if (response.ok) {
        navigate('/loggedinpage');
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      console.error('Error submitting user info:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {isAuthenticated && !isSubmitting ? (
        <>
          <input 
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
          />
          <input 
            type="text"
            placeholder="Hobbies (comma-separated)"
            value={hobbies}
            onChange={e => setHobbies(e.target.value)}
          />
          <input 
            type="text"
            placeholder="Blocked Sites (comma-separated URLs)"
            value={blockedSites}
            onChange={e => setBlockedSites(e.target.value)}
          />
          <button onClick={handleSubmit}>Register</button>
        </>
      ) : (
        <p>{isSubmitting ? 'Submitting...' : 'Please log in to register.'}</p>
      )}
    </div>
  );
};

export default RegistrationPage;
