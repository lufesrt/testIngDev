import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Blogs from "./components/Blogs";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </Router>
  );
}

export default App;

