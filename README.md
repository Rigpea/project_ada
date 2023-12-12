# project_ada

# Video demonstration: https://youtu.be/0ffQmcu9liI

# Project description: 
This app focuses on promoting productivity by gamifying tasks. Once the user goes to the Tasks page, they can enter a task name and the estimated amount of time to complete that task. Once the task is entered, users can start the timer and start doing their task. Once the timer is over, points are given to that user, which is stored in the database. The Recommendations page takes in the user's hobbies and returns a list of articles or books they might like based on the hobbies they entered. Finally, there is a Leaderboard page (not complete) that would allow users to compare their scores with friends.

# Technologies used:
Frontend:
React.js (HTML and JavaScript) and CSS (styling)

Backend:
Python Flask (Connects frontend to backend), Google Cloud (hosting database), MySQL (database)

# Challenges we faced: 
React Component State Management: Managing state across various components in React, particularly in handling user input and fetching data dynamically.
Error Handling and Debugging (a lot of time was spent on this): Identifying and resolving various errors, such as uncaught runtime errors, React Hook rules, and issues with undefined variables or functions.


# Future implementations:
Point economy system: Currently, our app gives users a fixed amount of points for completing a task, regardless of how long it takes. In the future, we would properly define a proper point economy system that gives points based on how long the task takes and give points based on x amount of points per hour rate.

Friends/Leaderboard system: Currently we do not have a friends system implemented. Implementing a friends system would allow users to directly compare points with their friends and we would be able to create a leaderboard between friends.

Verification system: Currently, our app cannot verify if a user has completed a task or not and gives points regardless of if the user actually completed the task or not. In the future, we can integrate an AI that verifies if the user has actually completed the task then reward the points.

