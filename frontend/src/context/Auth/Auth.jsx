import React, { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {


  const [usertoken, setUsertoken] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const navigate = useNavigate();


  useEffect(() => {



    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/check", { withCredentials: true });

        setUsertoken(response.data)

      } catch (error) {
        console.error("Auth check failed:", error.response ? error.response.data : error.message);
        setUsertoken(null);


      } finally {
        setLoading(false);
      }
    };
    checkAuth();




  }, [location.pathname]);



  const logout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (!confirmLogout) return;

    try {
      await axios.get(`/api/auth/logout`)
      window.location.reload();
    } catch (err) {
      console.error("Logout Error:", err)
    }

  }

  return (
    <AuthContext.Provider value={{ usertoken, setUsertoken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
