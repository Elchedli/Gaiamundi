import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';
import { HomePage } from 'pages/HomePage/HomePage';
import { LoginPage } from 'pages/LoginPage/LoginPage';
import { SignUpPage } from 'pages/SignUpPage/SignUpPage';
import { DashboardPage } from 'pages/DashboardPage/DashboardPage';
import { AuthProvider } from 'hooks/useAuth';
import ForgotPasswordPage from 'pages/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from 'pages/ResetPasswordPage/ResetPasswordPage';
import { NewPageCartoPage } from 'pages/NewMapPage/NewPageCartoPage';
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="page-carto/create" element={<NewPageCartoPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
