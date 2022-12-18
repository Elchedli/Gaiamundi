import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useRequireAuth = (redirectUrl = '/login') => {
  const auth = useAuth();
  const navigate = useNavigate();

  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate(redirectUrl);
    }
  }, [auth.user, redirectUrl, navigate]);

  return auth;
};
