import SignUpForm from 'components/Forms/SignUpForm';
import { Link } from 'react-router-dom';

export const SignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mx-4 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mt-24 text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Créer un compte
          </h2>
          <p className="mt-2 text-center text-gray-600 text-md">
            {`Vous disposez déjà d'un compte utilisateur ? `}
            <Link to="/login" className="text-blue-800">
              Se connecter
            </Link>
          </p>
        </div>
        <div className="px-4 py-8 mt-8 bg-white rounded-lg shadow-lg sm:px-10">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};
