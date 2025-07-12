import React, { createContext, useEffect, useState } from "react";

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: true,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setAuth({
        isLoggedIn: true,
        user: storedUser,
        isLoading: false,
      });
    } else {
      setAuth((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Function to login
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setAuth({
      isLoggedIn: true,
      user: userData,
      isLoading: false,
    });
    return userData;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuth({
      isLoggedIn: false,
      user: null,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
