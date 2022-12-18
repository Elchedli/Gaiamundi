import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Layout } from 'components/Layout/Layout';
import { HomePage } from 'pages/HomePage/HomePage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { SignUpPage } from 'pages/SignUpPage/SignUpPage';
import { DashboardPage } from 'pages/DashboardPage/DashboardPage';
import { AuthProvider } from 'hooks/useAuth';
import ForgotPasswordPage from 'pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from 'pages/ResetPasswordPage/ResetPasswordPage';
import { NewPageCartoPage } from 'pages/NewPageCartoPage/NewPageCartoPage';
import { ToastProvider } from 'hooks/useToast';
import { AccountPage } from 'pages/Account/AccountPage';
import { AccountEditPage } from 'pages/Account/AccountEditPage';

// Create a client
const queryClient = new QueryClient();

const isDev = process.env.NODE_ENV === 'development';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      <ToastProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="account/edit" element={<AccountEditPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route
                  path="forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route path="reset-password" element={<ResetPasswordPage />} />
                <Route
                  path="page-carto/create"
                  element={<NewPageCartoPage />}
                />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}
