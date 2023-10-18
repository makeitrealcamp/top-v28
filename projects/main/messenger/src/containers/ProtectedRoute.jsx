import React, { useContext } from 'react';
import UserContext from '../containers/UserContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  if (user) {
    return <>{children}</>;
  }
  return <Navigate to="/" />;
}
