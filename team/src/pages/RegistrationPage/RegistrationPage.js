import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const RegistrationPage = () => {
  const { user } = useAuth0();
  const [formData, setFormData] = useState({
    auth0_id: user.sub,  // Assuming this is how you get the Auth0 ID
    email: user.email,
    hobbies: '',
    tasks: '',
    emoji: '',
    date_of_birth: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/add_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data.message);
      // Redirect or display success message
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="displayName"
        value={formData.displayName} 
        onChange={handleChange}
        placeholder="Display Name"
      />
      <input 
        type="date" 
        name="dateOfBirth"
        value={formData.dateOfBirth} 
        onChange={handleChange}
      />
      <input 
        type="text" 
        name="hobbies"
        value={formData.hobbies} 
        onChange={handleChange}
        placeholder="Hobbies"
      />
      <input
        type="text"
        name="emoji"
        value={formData.emoji}
        onChange={handleChange}
        placeholder="Emoji"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationPage;
