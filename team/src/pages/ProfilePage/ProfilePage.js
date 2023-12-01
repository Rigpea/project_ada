import React, { useState } from 'react';
import './ProfilePage.css'; // Import corresponding CSS file

const ProfilePage = () => {
  const [displayName, setDisplayName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [moodEmoji, setMoodEmoji] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission of the form
    // This might involve sending the data to your backend server
  };

  return (
    <>
      <nav className="navigation-bar">
        <ul>
          <li><a href="/loggedin">Home</a></li>
          <li><a href="/tasks">Tasks</a></li>
          <li><a href="/points">Points</a></li>
          <li><a href="/recommendations">Recommendations</a></li>
          <li><a href="/profile">Profile</a></li>
          {/* Add more navigation items here */}
        </ul>
      </nav>
      <div className="profile-page">
      <form onSubmit={handleSubmit}>
        <label>
          Display Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>
        <label>
          Hobbies:
          <input
            type="text"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
        </label>
        <label>
          Mood Emoji:
          <input
            type="text"
            value={moodEmoji}
            onChange={(e) => setMoodEmoji(e.target.value)}
            placeholder="🙂"
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
      </div>
    </>
  );
};

export default ProfilePage;