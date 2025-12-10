Learning Dashboard – Full Stack Web Application

A full-stack Learning Dashboard that allows students to manage courses, track progress, take notes, manage tasks, and maintain a personalized study workflow. Built using React.js, Node.js, Express, and MongoDB.

⭐ Features

User authentication (Register/Login)

Dashboard displaying enrolled courses & stats

Browse and view course modules

Automatic progress tracking

Manage personal notes (Create, Read, Update, Delete)

To-Do / Task Manager

Responsive UI for mobile & desktop

RESTful API backend

Cloud Database using MongoDB Atlas

🛠️ Tech Stack
Frontend

React.js

React Router

Axios

CSS (Responsive UI)

Backend

Node.js

Express.js

JWT Authentication

Mongoose ORM

Database

MongoDB Atlas

Collections: Users, Courses, Notes, Tasks, Progress

📂 Project Structure
Learning_Dashboard/
│
├── client/              # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
│
├── server/              # Backend API
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
└── README.md

🚀 How to Run Locally
1. Clone Repository
git clone https://github.com/yourusername/Learning_Dashboard.git
cd Learning_Dashboard

2. Start Backend
cd server
npm install
node server.js

3. Start Frontend
cd client
npm install
npm start

🔌 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login

Courses
GET /api/courses
GET /api/courses/:id

Notes
POST /api/notes
GET /api/notes/:userId
PUT /api/notes/:id
DELETE /api/notes/:id

Tasks
POST /api/tasks
GET /api/tasks/:userId
PUT /api/tasks/:id
DELETE /api/tasks/:id

Progress
PUT /api/progress/:moduleId
