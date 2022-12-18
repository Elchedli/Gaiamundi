import { useAuth } from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Button } from 'components/Button/Button';
import { Label } from './Inputs/Label';
import { TextInput } from './Inputs/TextInput';
import { EMAIL_REGEX } from 'utils/utils';
import { useToast } from 'hooks/useToast';
import { strapi } from 'services/strapi';
import { UserAuthResponse, UserCredentials } from 'interfaces/user';
import { ApiError } from 'interfaces/api';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCredentials>();
  const { authenticate } = useAuth();

  const { mutateAsync, isError, error, isLoading } = useMutation<
    UserAuthResponse,
    ApiError,
    UserCredentials
  >({
    mutationFn: async ({ email, password }) => {
      return await strapi.login(email, password);
    },
    onSuccess: ({ user, jwt }) => {
      authenticate(user, jwt);
      navigate('/dashboard');
      addToast({
        title: 'Bienvenue !👋',
        description: 'Connexion effectuée avec succès.',
        type: 'success',
      });
    },
  });

  const onSubmit = (data: UserCredentials) => {
    mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError && <ApiErrorAlert error={error} />}
      <div className="rounded-md">
        <Label htmlFor="email" className="block font-medium  text-gray-700">
          Adresse E-mail
        </Label>
        <div className="mt-1 rounded-md">
          <TextInput
            id="email"
            className="w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            type="email"
            {...register('email', {
              required: 'Veuillez saisir votre adresse E-mail',
              pattern: {
                value: EMAIL_REGEX,
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
        <Label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Mot de passe
        </Label>
        <div className="mt-1 rounded">
          <TextInput
            id="password"
            className="w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
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

      <div className="flex items-end mt-4 text-sm leading-5">
        <Link
          to="/forgot-password"
          className="font-medium transition duration-150 ease-in-out text-blue-800 hover:text-royal-blue-500 focus:outline-none focus:underline"
        >
          Mot de passe oublié ?
        </Link>
      </div>
      <Button className="mt-4" type="submit" isLoading={isLoading}>
        Connexion
      </Button>
    </form>
  );
};

export default LoginForm;
