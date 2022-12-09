import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User, UserSignUpFields } from 'interfaces/user';
import { useCookie } from './useCookie';
import {
  forgotPassword,
  getCurrentUser,
  login,
  register,
  updateAccount,
  resetPassword,
} from '../services/user';

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  signUp: (data: UserSignUpFields) => Promise<User>;
  signIn: (credentials: { email: string; password: string }) => Promise<User>;
  signOut: () => void;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  changePassword: (
    code: string,
    password: string,
    password2: string
  ) => Promise<User>;
  updateUser: (id: number, data: UserSignUpFields) => Promise<User>;
}

const authContext = createContext({ user: null } as AuthContext);

// AuthProvider is a Context Provider that wraps our app and makes an auth object
// available to any child component that calls the useAuth() hook.
export function AuthProvider(props: { children: ReactNode }): JSX.Element {
  const auth = useAuthProvider();
  return (
    <authContext.Provider value={auth}>{props.children}</authContext.Provider>
  );
}

// useAuth is a hook that enables any component to subscribe to auth state
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const { cookieItem: jwtToken, updateCookieItem: setJwtToken } =
    useCookie<string>('token', '', {
      days: 24,
    });
  const isAuthenticated = !!jwtToken;

  const signUp = async (currentUser: UserSignUpFields) => {
    const { jwt, user } = await register(currentUser);
    setUser(user);
    setJwtToken(jwt);
    return user;
  };

  const updateUser = async (id: number, data: UserSignUpFields) => {
    const result = await updateAccount(id, data);
    setUser(result);
    return result;
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { jwt, user } = await login(email, password);
    setUser(user);
    setJwtToken(jwt);
    return user;
  };

  const signOut = async () => {
    setJwtToken('');
    return setUser(null);
  };

  const sendPasswordResetEmail = async (email: string) => {
    return await forgotPassword(email);
  };

  const changePassword = async (
    code: string,
    password: string,
    password2: string
  ) => {
    const response = await resetPassword(code, password, password2);
    const { jwt, user } = response;
    setUser(user);
    setJwtToken(jwt);
    return user;
  };

  const loadCurrentUser = async () => {
    try {
      const user = await getCurrentUser(jwtToken);
      setUser(user);
      return user;
    } catch (e) {
      setJwtToken('');
    }
  };

  useEffect(() => {
    // @todo : fetch current user  on load
    if (isAuthenticated) {
      loadCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    user,
    jwtToken,
    isAuthenticated: !!isAuthenticated,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
    changePassword,
    updateUser,
  };
};
