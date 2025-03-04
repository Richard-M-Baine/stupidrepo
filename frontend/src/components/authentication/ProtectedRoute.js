import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(state => state?.session?.user?.user);
  const location = useLocation(); 

  console.log("Protected Route - Current user:", user);

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};


export default ProtectedRoute;
