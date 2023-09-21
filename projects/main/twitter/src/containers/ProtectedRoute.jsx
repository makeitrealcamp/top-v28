import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const user = null;
  return user ? children : <Navigate to="/home" />;
}
