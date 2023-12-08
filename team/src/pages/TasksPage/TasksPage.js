import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const TasksPage = () => {
  const { user } = useAuth0();
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task && time && !isNaN(time)) {
      setTasks([...tasks, { task, time: parseInt(time), isStarted: false }]);
      setTask('');
      setTime('');
    }
  };

  const startTimer = (index) => {
    setTasks(tasks.map((t, i) => {
      if (i === index) {
        t.isStarted = true;
        // Start a countdown
        const timer = setInterval(() => {
          if (t.time > 0) {
            setTasks(currentTasks => currentTasks.map((item, idx) => {
              if (idx === index) {
                return { ...item, time: item.time - 1 };
              }
              return item;
            }));
          } else {
            clearInterval(timer);
            // Add a point
            addPoint();
          }
        }, 1000);
      }
      return t;
    }));
  };

  const addPoint = async () => {
    if (user && user.sub) {
      await fetch('http://localhost:8080/add_points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: user.sub })
      });
    }
  };

  return (
    <div>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Task"/>
      <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Time in minutes"/>
      <button onClick={handleAddTask}>Add Task</button>

      <div>
        {tasks.map((t, index) => (
          <div key={index}>
            <p>{t.task} - {t.time} minutes</p>
            {!t.isStarted && <button onClick={() => startTimer(index)}>Start</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
