import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../store/userReducer';

export default function ProtectedRoute({ children }) {
  const user = useSelector(getUser);
  return user ? children : <Navigate to="/home" />;
}
