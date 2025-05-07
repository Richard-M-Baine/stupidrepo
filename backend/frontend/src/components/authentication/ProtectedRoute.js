import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(state => state?.session?.user);
  const location = useLocation(); 


  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};


export default ProtectedRoute;
