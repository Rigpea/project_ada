import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const BlockedPage = () => {
  const { user } = useAuth0();
  const [blockedSites, setBlockedSites] = useState([]);
  const [newSite, setNewSite] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch blocked sites on component mount
  useEffect(() => {
    fetchBlockedSites();
  }, []);

  const fetchBlockedSites = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/get_blocked_sites?user_id=${user.sub}`);
      if (response.ok) {
        const data = await response.json();
        setBlockedSites(data.blocked_sites || []);
      }
    } catch (error) {
      console.error('Error fetching blocked sites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSite = async () => {
    setIsLoading(true);
    try {
      await fetch('http://localhost:8080/add_blocked_site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.sub, url: newSite })
      });
      setNewSite('');
      fetchBlockedSites();  // Refresh the list
    } catch (error) {
      console.error('Error adding blocked site:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSite = async () => {
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

  return (
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
    </div>
  );
};

export default BlockedPage;
