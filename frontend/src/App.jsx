import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TaskList from './pages/TaskList.jsx';
import AddTask from './pages/AddTask.jsx';
import EditTask from './pages/EditTask.jsx';

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Task Manager</h1>
        <nav>
          <Link to="/">Tasks</Link>
          <Link to="/add">Add Task</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/edit/:id" element={<EditTask />} />
      
        </Routes>
      </main>

      <footer>
        <small>Built with MERN — created by Rupesh Mali for assignment</small>
      </footer>
    </div>
  );
}
