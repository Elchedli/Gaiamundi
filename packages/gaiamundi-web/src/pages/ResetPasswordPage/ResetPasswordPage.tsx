import ResetPasswordForm from 'components/Forms/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="mx-4 mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mt-24 text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Nouveau mot de passe
          </h2>
          <p className="mt-2 text-center text-gray-600 text-md">
            {'Veuillez saisir et confirmer votre nouveau mot de passe'}
          </p>
        </div>
        <div className="px-4 py-8 mt-8 bg-white rounded-lg shadow-lg sm:px-10">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
