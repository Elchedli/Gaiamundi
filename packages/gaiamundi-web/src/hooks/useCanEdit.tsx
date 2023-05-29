import { useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useCanEdit = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isOnEditorPage = location.pathname.endsWith('edit');
  return isAuthenticated && isOnEditorPage;
};
