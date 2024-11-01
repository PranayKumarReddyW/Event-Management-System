import React, { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// Custom hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user state from local storage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Parse stored user data
  });
  const [token, setToken] = useState(() => localStorage.getItem("token")); // Get token from local storage on initial load

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); // Store token in local storage
    } else {
      localStorage.removeItem("token"); // Remove token if user logs out
    }
  }, [token]); // Update local storage whenever token changes

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // Store user in local storage
    } else {
      localStorage.removeItem("user"); // Remove user if logged out
    }
  }, [user]); // Update local storage whenever user changes

  const login = (userData, userToken) => {
    setUser(userData); // Set user data upon login
    setToken(userToken); // Set token
    console.log("User logged in:", userData);
  };

  const logout = () => {
    setUser(null); // Clear user data upon logout
    setToken(null); // Clear token
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
