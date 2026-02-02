import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Solve from "./pages/Solve.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/Navbar.jsx";
import MockInterview from "./pages/MockInterview.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/Profile.jsx";
import TestSocket from "./pages/TestSocket.jsx";
import { SocketProvider } from "./context/SocketContext";
import GlobalBroadcast from "./components/GlobalBroadcast";

export default function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Navbar />
        <GlobalBroadcast />
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/mock"
          element={
            <ProtectedRoute>
              <MockInterview />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/solve/:problemId"
          element={
            <ProtectedRoute>
              <Solve />
            </ProtectedRoute>
          }
        />

        <Route 
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
        />

        <Route
        path="/test-socket"
        element={
          
            <TestSocket />
          
        }
        />

        {/* Default */}
        <Route path="*" element={<Login />} />
      </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}
