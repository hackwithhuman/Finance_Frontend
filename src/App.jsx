import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";

import { UserProvider, UserContext } from "./Context/UserContaxt";
import LoginLayout from "./Layout/LoginLayout";
import DashBoardLayout from "./Layout/DashBoardLayout";

import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/DashBoard/Home";
import Income from "./pages/DashBoard/Income";
import Expense from "./pages/DashBoard/Expense";
import axiosInstance from "./Utils/axiosInstance";
import { API_PATHS } from "./Utils/apiPath";
import Loader from "./Components/Loader";
import LandingRoute from "./Components/LandingPage";

function App() {
  // Setup global axios config
  axios.defaults.baseURL = import.meta.env.VITE_API_URL || "https://finance-backend-blush.vercel.app";

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && [401, 403].includes(error.response.status)) {
        localStorage.removeItem("token");
      }
      return Promise.reject(error);
    }
  );

  return (
    <UserProvider>
      <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
      <Router>
        <Routes>
  <Route path="/" element={<LandingRoute />} />

  <Route element={<LoginLayout />}>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
  </Route>

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <DashBoardLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Home />} />
    <Route path="income" element={<Income />} />
    <Route path="expense" element={<Expense />} />
  </Route>

  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>

      </Router>
    </UserProvider>
  );
}

export default App;

// --- Helper Components ---

// Redirect user based on login state
const RootRedirect = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

// Protect all dashboard routes
const ProtectedRoute = ({ children }) => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    setIsValid(false);
    return;
  }

  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.AUTH.PROFILE);
      if (res.data) updateUser(res.data);
      setIsValid(true);
    } catch (err) {
      clearUser();
      localStorage.removeItem("token");
      setIsValid(false);
    }
  };

  fetchProfile();
}, []); // ✅ only once


  if (isValid === null) {
    return (
        <Loader/>
   
    );
  }

  if (!isValid) return <Navigate to="/login" replace />;
  return children;
};
