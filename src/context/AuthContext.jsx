import React, { createContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) setAuthToken(token);
    else setAuthToken(null);
  }, [token]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", credentials);
      const { token, user } = res.data; // Backend returns {token, user}
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthToken(token);
      setLoading(false);
      navigate("/");
      return res.data;
    } catch (err) {
      console.error("Login API error:", err.response || err);
      setLoading(false);
      throw err;
    }
  };

  const signup = async (payload) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/signup", payload);
      if (res.data.token && res.data.user) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setAuthToken(res.data.token);
      }
      setLoading(false);
      navigate("/");
      return res.data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
