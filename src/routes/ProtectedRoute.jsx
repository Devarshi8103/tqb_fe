// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem("token") === "true";
  console.log("isAuthenticated:", isAuthenticated); // Add this line

  return isAuthenticated ? <Component /> : <Navigate to="/signIn" />;
};

export default ProtectedRoute;
