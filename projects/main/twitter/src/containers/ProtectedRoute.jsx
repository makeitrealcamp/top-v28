import { useContext } from 'react';
import UserContext from '../containers/UserContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/home" />;
}
