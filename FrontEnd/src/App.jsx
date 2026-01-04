import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Solve from "./pages/Solve.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/solve"
          element={
            <ProtectedRoute>
              <Solve />
            </ProtectedRoute>
          }
        />

        {/* Default */}
        <Route path="*" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}
