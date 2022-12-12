import { useEffect, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useToast } from 'hooks/useToast';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from 'components/Button/Button';
import { ApiError, ApiErrorResponse } from 'interfaces/api';
import { emailRegex } from 'utils/utils';

interface LoginData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user, signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | undefined>(undefined);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const onSubmit = (data: LoginData) => {
    setIsLoading(true);
    setError(undefined);
    signIn(data)
      .then(() => {
        navigate('/dashboard');
        addToast({
          title: 'Bienvenue !👋',
          description: 'Connexion effectuée avec succès.',
          type: 'success',
        });
      })
      .catch(({ error }: ApiErrorResponse) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error?.message && (
        <div className="p-2 mb-4 text-center text-red-500 border border-red-600 border-dashed rounded">
          <span>{error.message}</span>
        </div>
      )}
      <div className="rounded-md">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Adresse E-mail
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="email"
            className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            type="email"
            {...register('email', {
              required: 'Veuillez saisir votre adresse E-mail',
              pattern: {
                value: emailRegex,
                message: 'Email invalide !',
              },
            })}
          />
          {errors.email && (
            <div className="mt-2 text-xs text-red-600">
              {errors.email.message}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Mot de passe
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="password"
            className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            type="password"
            {...register('password', {
              required: 'Veuillez saisir votre mot de passe',
              minLength: {
                value: 6,
                message: 'Le mot de passe doit contenir au moins 6 charactères',
              },
            })}
          />
          {errors.password && (
            <div className="mt-2 text-xs text-red-600">
              {errors.password.message}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-end mt-4">
        <div className="text-sm leading-5">
          <Link
            to="/forgot-password"
            className="font-medium transition duration-150 ease-in-out text-blue-800 hover:text-royal-blue-500 focus:outline-none focus:underline"
          >
            Mot de passe oublié ?
          </Link>
        </div>
      </div>

      <div className="mt-4">
        <span className="block w-full rounded-md shadow-sm">
          <Button type="submit" isLoading={isLoading}>
            Connexion
          </Button>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
