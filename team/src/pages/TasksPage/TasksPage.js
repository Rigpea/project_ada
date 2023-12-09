import React, { useState } from 'react';
import './TasksPage.css'; // Ensure this CSS file is styled as per your requirements
import { useAuth0 } from '@auth0/auth0-react';

const TasksPage = () => {
  // tasks are now objects with { description, hours, minutes, timerId }
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState('');
  const [newTaskHours, setNewTaskHours] = useState(0);
  const [newTaskMinutes, setNewTaskMinutes] = useState(0);
  const { user, logout } = useAuth0();


  // const addPoints = () => {
  //   fetch('http://localhost:8080/add_points', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ user_id: defaultUserId, url: url.hostname })
  //   }).catch(error => {
  //     console.error('Error posting to subtract points:', error);
  //   });
  // }

  const addPoints = async (points) => {
    try {
      await fetch('http://localhost:8080/add_points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.sub, points: points }) // Update 'defaultUserId' with actual user ID
      });
    } catch (error) {
      console.error('Error adding points:', error);
    }
  };

  const addTask = () => {
    if (newTask) {
      const taskMinutes = parseInt(newTaskMinutes, 10);
      const taskPoints = taskMinutes * 5; // Each minute is worth 5 points
      setTasks([...tasks, { 
        description: newTask, 
        hours: parseInt(newTaskHours, 10), 
        minutes: taskMinutes, 
        points: taskPoints, // Add the points to the task object
        timerId: null 
      }]);
      // Reset the input fields
      setNewTask('');
      setNewTaskHours(0);
      setNewTaskMinutes(0);
    }
  };

const startTimer = (taskIndex) => {
  let task = tasks[taskIndex];
  let totalSeconds = task.hours * 3600 + task.minutes * 60;

  if (task.timerId) {
    clearInterval(task.timerId);
  }

  const timerId = setInterval(() => {
    totalSeconds -= 1;
    if (totalSeconds <= 0) {
      clearInterval(timerId);
      alert(`Time's up for: ${task.description}`);
      // Call addPoints when the timer hits 0
      addPoints(task.points);
    } else {
      const updatedHours = Math.floor(totalSeconds / 3600);
      const updatedMinutes = Math.floor((totalSeconds % 3600) / 60);
      setTasks(tasks.map((t, index) => index === taskIndex ? {...t, hours: updatedHours, minutes: updatedMinutes} : t));
    }
  }, 1000);

  setTasks(tasks.map((t, index) => index === taskIndex ? {...t, timerId} : t));
};


  {tasks.map((task, index) => (
    <div key={index} className="task">
      <span>{task.description} - {task.hours}h {task.minutes}m - {task.points} points</span>
      <button onClick={() => startTimer(index)}>Start Timer</button>
    </div>
  ))}

  return (
    <div className="tasksPageContainer">
      <nav className="navigation-bar">
        <ul>
          <li><a href="/loggedinpage">Home</a></li>
          <li><a href="/tasks">Tasks</a></li>
          <li><a href="/points">Points</a></li>
          <li><a href="/recommendations">Recommendations</a></li>
          <li><a href="/profilepage">Profile</a></li>
        </ul>
      </nav>
      <div className="tasks-page">
        <div className="add-task-form">
          <input
            type="text"
            placeholder="Task Description"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            type="number"
            placeholder="Hours"
            value={newTaskHours}
            onChange={(e) => setNewTaskHours(e.target.value)}
          />
          <input
            type="number"
            placeholder="Minutes"
            value={newTaskMinutes}
            onChange={(e) => setNewTaskMinutes(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <div className="tasks-list">
          {tasks.map((task, index) => (
            <div key={index} className="task">
              <span>{task.description} - {task.hours}h {task.minutes}m</span>
              <button onClick={() => startTimer(index)}>Start Timer</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;

