import React from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
  useQuery,
  useQueryClient,
} from 'react-query';

import { Alert } from 'components/Alert/Alert';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { User } from 'interfaces/user';
import { strapi } from '../services/strapi';
import { useLocalStorageState } from './useLocalStorageState';

// const updateAccount = async (id: number, userData: UserSignUpFields) => {
//   return (await strapi.update(ContentType.USERS, id, userData)) as User;
// };

export interface AuthContextValue {
  user: User | undefined;
  isAuthenticated: boolean;
  setUser: (data: User | undefined) => void;
  authenticate: (user: User, jwt: string) => void;
  logout: UseMutateFunction;
  refetchUser: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<User, Error>>;
  error: Error | null;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);
AuthContext.displayName = 'AuthContext';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const { value: jwtToken, persistValue: persistJwtToken } =
    useLocalStorageState('token');
  const queryClient = useQueryClient();
  const key = 'auth-user';

  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery<User, Error>({
    queryKey: key,
    queryFn: async () => {
      return await strapi.currentUser(jwtToken);
    },
    enabled: !!jwtToken,
  });

  const setUser = (data: User | undefined) =>
    queryClient.setQueryData(key, data);

  const authenticate = (user: User, jwt: string) => {
    setUser(user);
    persistJwtToken(jwt);
  };

  const logout = () => {
    persistJwtToken('');
    queryClient.clear();
  };

  if (isLoading) {
    return <LoadingMessage />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!jwtToken,
        error,
        setUser,
        authenticate,
        refetchUser: refetch,
        logout,
      }}
    >
      {error && <Alert>{error.message}</Alert>}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
};
