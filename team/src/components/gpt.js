import React, { useState, useEffect, useCallback } from 'react';
import './gpt.css'; // Import corresponding CSS file

const Recommendations = () => {
  const [userInput, setUserInput] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const processInput = useCallback(async () => {
    try {
      const response = await fetch('/generate_schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }), // Update to match the property name
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRecommendation(data.schedule); // Assuming schedule is the property you want to display
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    }
  }, [userInput]); // Include userInput in the dependency array

  useEffect(() => {
    const effect = async () => {
      await processInput(); // Call the function on component mount
    };

    effect();

    return () => {
      // Cleanup logic if needed
    };
  }, [userInput, processInput]); // Include processInput in the dependency array

  return (
    <div className="gpt-container">
      <textarea
        className="input-textbox"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Please enter your goals here"
      />
      <button className="submit-button" onClick={processInput}>Submit</button>
      <textarea
        className="output-textbox"
        value={recommendation}
        readOnly
        placeholder="Your personalized schedule will appear here"
      />
    </div>
  );
};

export default Recommendations;
