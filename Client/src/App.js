import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  const handleFavouriteToggle = (book) => {
    setFavourites((prev) => {
      const isFavourite = prev.some((fav) => fav.id === book.id);
      if (isFavourite) {
        return prev.filter((fav) => fav.id !== book.id);
      }
      return [...prev, book];
    });
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              isAuthenticated={isAuthenticated}
              onFavouriteToggle={handleFavouriteToggle}
              favourites={favourites}
            />
          }
        />
        <Route
          path="/favourites"
          element={
            isAuthenticated ? <Favourites favourites={favourites} /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </>
  );
};

export default App;
