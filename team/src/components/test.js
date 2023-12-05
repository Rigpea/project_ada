import React, { useEffect, useState } from 'react';

const TestComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/test') // Adjust the URL as needed
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setMessage('Failed to fetch data');
      });
  }, []);

  return (
    <div>
      {message ? <p>{message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default TestComponent;
