import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './lib/store';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Route>
        ) : (
          <Route element={<AuthLayout />}>
            <Route path="*" element={<Login />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;