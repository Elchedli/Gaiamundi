import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Button } from 'components/Button/Button';
import { Label } from 'components/Inputs/Label';
import { TextInput } from 'components/Inputs/TextInput';
import { useToast } from 'hooks/useToast';
import { useUrlQuery } from 'hooks/useUrlQuery';
import { ApiError } from 'interfaces/api';
import { UserAuthResponse } from 'interfaces/user';
import { resetPassword } from 'services/user';

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
  const query = useUrlQuery();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync, isError, error, isLoading } = useMutation<
    UserAuthResponse,
    ApiError,
    { code: string; password: string; password2: string }
  >({
    mutationFn: ({ code, password, password2 }) =>
      resetPassword(code, password, password2),
    onSuccess: () => {
      navigate('/dashboard');
      addToast({
        title: 'Bienvenue !👋',
        description: 'Connexion effectuée avec succès.',
        type: 'success',
      });
    },
  });

  const onSubmit = (data: { password: string; password2: string }) => {
    const code = query.get('code') || '';
    mutateAsync({ ...data, code });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError && <ApiErrorAlert error={error} />}
      <div className="mt-4">
        <Label
          htmlFor="password"
          className="text-sm font-medium leading-5 text-gray-700"
        >
          Nouveau mot de passe
        </Label>
        <div className="mt-1 rounded-md">
          <TextInput
            id="password"
            className="w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
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
        <Label
          htmlFor="password2"
          className="text-sm font-medium leading-5 text-gray-700"
        >
          Confirmation du mot de passe
        </Label>
        <div className="mt-1 rounded-md">
          <TextInput
            id="password2"
            className="w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
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
        <span className="w-full rounded-md">
          <Button type="submit" isLoading={isLoading}>
            Confirmer
          </Button>
        </span>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
