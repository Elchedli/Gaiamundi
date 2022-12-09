import { Button } from 'components/Button/Button';
import { useAuth } from 'hooks/useAuth';
import useQuery from 'hooks/useQuery';
import { useToast } from 'hooks/useToast';
// import { useAuth } from 'hooks/useAuth';
import { ApiError, ApiErrorResponse } from 'interfaces/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<{ password: string; password2: string }>({
    defaultValues: {
      password: '',
      password2: '',
    },
  });
  const query = useQuery();
  const { addToast } = useToast();
  const { changePassword } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | undefined>(undefined);

  const onSubmit = (data: { password: string; password2: string }) => {
    setIsLoading(true);
    setError(undefined);
    const code = query.get('code') || '';
    changePassword(code, data.password, data.password2)
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
      <div className="mt-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Nouveau mot de passe
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
                message: 'Le mot de passe doit avoir au moins 6 charactères',
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
      <div className="mt-4">
        <label
          htmlFor="password2"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Confirmation du mot de passe
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="password2"
            className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            type="password"
            {...register('password2', {
              required: 'Veuillez saisir la confirmation du mot de passe',
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'La confirmation du mot de passe est incorrecte.';
                }
              },
            })}
          />
          {errors.password2 && (
            <div className="mt-2 text-xs text-red-600">
              {errors.password2.message}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4">
        <span className="block w-full rounded-md shadow-sm">
          <Button type="submit" isLoading={isLoading}>
            Confirmer
          </Button>
        </span>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
