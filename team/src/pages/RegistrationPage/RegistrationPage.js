// RegistrationPage.js
import React, { useState } from 'react';

const RegistrationPage = () => {
  const [displayName, setDisplayName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [emoji, setEmoji] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission logic, e.g., send data to your backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={displayName} 
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Display Name"
      />
      <input 
        type="date" 
        value={dateOfBirth} 
        onChange={(e) => setDateOfBirth(e.target.value)}
      />
      <input 
        type="text" 
        value={hobbies} 
        onChange={(e) => setHobbies(e.target.value)}
        placeholder="Hobbies"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationPage;
