import LoginForm from 'components/User/LoginForm';
import { Link } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mx-4 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mt-24 text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Connexion
          </h2>
          <p className="mt-2 text-center text-gray-600 text-md">
            {"Vous n'avez pas encore un compte ? "}
            <Link to="/signup" className="text-blue-800">
              Créer un compte
            </Link>
          </p>
        </div>
        <div className="px-4 py-8 mt-8 bg-white rounded-lg shadow-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
