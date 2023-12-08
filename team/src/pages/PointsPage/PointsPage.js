import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './PointsPage.css'; // Add your CSS file for styling
import Navbar from "../../components/navbar.js";

const PointsPage = () => {
  const { user } = useAuth0();
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPoints = async () => {
    if (!user) {
      console.error("User not found");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/get_points?user_id=${encodeURIComponent(user.sub)}`);
      if (response.ok) {
        const data = await response.json();
        setPoints(data.points);
      } else {
        console.error("Failed to fetch points");
      }
    } catch (error) {
      console.error('Error fetching points:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, [user]);

  return (
    <div className="points-container">
    <Navbar/>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="points-display">
          <h1>Current Points</h1>
          <p>{points}</p>
        </div>
      )}
    </div>
  );
};

export default PointsPage;
