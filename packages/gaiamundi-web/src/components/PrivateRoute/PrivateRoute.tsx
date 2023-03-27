import { useAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  if (!auth.isAuthenticated) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
