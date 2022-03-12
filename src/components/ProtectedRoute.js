import { Route, Navigate } from 'react-router-dom';
import React from 'react';

function ProtectedRoute(props) {
  const { children, loggedIn } = props;
  if (loggedIn) {
    return <>{children}</>;
  }
  return <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
