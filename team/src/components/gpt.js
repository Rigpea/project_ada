import React, { useState, useEffect } from 'react';
import './gpt.css'; // Import corresponding CSS file

const Recommendations = () => {
  const [userInput, setUserInput] = useState('');
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    const processInput = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/gpt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_input: userInput }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setRecommendation(data);
      } catch (error) {
        console.error('Error fetching recommendation:', error);
      }
    };

    document.getElementById('userInput').addEventListener('input', processInput);

    return () => {
      document.getElementById('userInput').removeEventListener('input', processInput);
    };
  }, [userInput]);

  return (
    <div>
      <label htmlFor="userInput">
        Please input your goals for the week (500 characters max):
      </label>
      <textarea
        id="userInput"
        maxLength="500"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <h2>Our suggestion:</h2>
      <div id="outputBox">{recommendation}</div>
    </div>
  );
};

export default Recommendations;