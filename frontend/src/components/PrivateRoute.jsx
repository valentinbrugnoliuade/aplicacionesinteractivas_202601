import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/slices/authSlice';

export default function PrivateRoute({ children, requiredRol }) {
  const { token, rol } = useSelector(selectAuth);

  if (!token) return <Navigate to="/login" replace />;
  if (requiredRol && rol !== requiredRol) return <Navigate to="/dashboard" replace />;

  return children;
}
