import React, { createContext, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user data (e.g., email, role)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login function
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    // Navigate home
     <Navigate to="/" />; 
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};