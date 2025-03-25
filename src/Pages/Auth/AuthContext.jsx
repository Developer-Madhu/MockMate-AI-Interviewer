// import { createContext, useContext, useState } from "react";
// import axios from "axios";

// // Create Auth Context
// const AuthContext = createContext();

// // Auth Provider Component
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);

//     // Login function
//     const login = (newToken, userData) => {
//         setToken(newToken);
//         setUser(userData);
//     };

//     // Logout function
//     const logout = async () => {
//         await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
//         setUser(null);
//         setToken(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, token, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use auth context
// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage for user data
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('progress');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);