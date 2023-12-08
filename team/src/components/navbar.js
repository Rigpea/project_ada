import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // Ensure you have a CSS file for styling your navbar

const Navbar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li><Link to="/loggedinpage">Home</Link></li>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/points">Points</Link></li>
        <li><Link to="/recommendations">Recommendations</Link></li>
        <li><Link to="/profilepage">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;