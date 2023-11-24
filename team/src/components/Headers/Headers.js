import React from 'react';
import { useLocation } from 'react-router-dom';
//import './Header.css';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;