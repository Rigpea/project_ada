// Recommendations.js
import React from 'react';
import OurRecommendations from "../../components/gpt.js";
import './Recommendations.css';

const Recommendations = () => {
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
        <h1>Welcome to your personal recommender!</h1>
        <OurRecommendations />  {/* Use the renamed component here */}
      </div>
    </div>
  );
};

export default Recommendations;
