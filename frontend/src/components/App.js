import React from 'react';
import './App.css';
import TaskPage from '../pages/TaskPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // Import Link from react-router-dom
import LoginPage from '../pages/LoginPage';
import RequiredAuth from './RequiredAuth';
import { SignupPage } from '../pages/SignupPage';
import { LogoutPage } from '../pages/LogoutPage';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">SignUp</Link>
        <Link to="/logout">LogOut</Link>

      </nav>
      <Routes>
        <Route
          index
          element={
            <RequiredAuth>
              <TaskPage />
            </RequiredAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<LogoutPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
