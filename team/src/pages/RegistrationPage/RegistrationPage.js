import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const { user, isAuthenticated } = useAuth0();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSubmitting(true); // Indicate that submission is in progress
    try {
      const response = await fetch('http://localhost:8080/add_basic_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user.sub, // Use 'user_id' to match the expected parameter in your SQL statement
          email: user.email
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        navigate('/loggedIn'); // Redirect to the loggedIn page
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      console.error('Error submitting user info:', error);
    } finally {
      setIsSubmitting(false); // Indicate that submission is done
    }
  };

  return (
    <div>
      {isAuthenticated && !isSubmitting ? (
        <button onClick={handleSubmit}>
          Register
        </button>
      ) : (
        <p>{isSubmitting ? 'Submitting...' : 'Please log in to register.'}</p>
      )}
    </div>
  );
};

export default RegistrationPage;
