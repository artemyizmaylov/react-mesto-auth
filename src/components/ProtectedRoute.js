import { Navigate } from 'react-router-dom';
import React from 'react';

function ProtectedRoute({ children, loggedIn }) {
  if (loggedIn) {
    return <>{children}</>;
  }
  return <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
