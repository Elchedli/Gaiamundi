import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from 'components/Layout/Layout';
import { AuthProvider } from 'hooks/useAuth';
import { ToastProvider } from 'hooks/useToast';
import { AccountEditPage } from 'pages/Account/AccountEditPage';
import { AccountPage } from 'pages/Account/AccountPage';
import { DashboardPage } from 'pages/DashboardPage/DashboardPage';
import ForgotPasswordPage from 'pages/ForgotPasswordPage/ForgotPasswordPage';
import { HomePage } from 'pages/HomePage/HomePage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { NewPageCartoPage } from 'pages/NewPageCartoPage/NewPageCartoPage';
import { PageCartoEditPage } from 'pages/PageCartoPage/PageCartoPage';
import ResetPasswordPage from 'pages/ResetPasswordPage/ResetPasswordPage';
import { SignUpPage } from 'pages/SignUpPage/SignUpPage';
import { TermsOfUse } from 'pages/TermsOfUse/TermsOfUse';

import { ProtectedRoute } from 'components/PrivateRoute/PrivateRoute';
import 'react-data-grid/lib/styles.css';

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
                <Route path="termsofuse" element={<TermsOfUse />} />
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
                <Route
                  path="page-carto/:id/edit"
                  element={
                    <ProtectedRoute>
                      <PageCartoEditPage />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  );
}
