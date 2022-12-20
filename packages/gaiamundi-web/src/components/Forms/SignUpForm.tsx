import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Button } from 'components/Button/Button';
import { useAuth } from 'hooks/useAuth';
import { UserAuthResponse, UserSignUpFields } from 'interfaces/user';
import { EMAIL_REGEX } from 'utils/utils';
import { TextInput } from './Inputs/TextInput';
import { Label } from './Inputs/Label';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { strapi } from 'services/strapi';
import { ApiError } from 'interfaces/api';
import { useToast } from 'hooks/useToast';

interface Props {
  email?: string;
}

const SignUpForm = ({ email }: Props) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserSignUpFields & { password2: string }>({
    defaultValues: {
      username: '',
      email,
      password: '',
    },
  });
  const { authenticate } = useAuth();

  const { mutateAsync, isError, error, isLoading } = useMutation<
    UserAuthResponse,
    ApiError,
    UserSignUpFields
  >({
    mutationFn: async (newUser) => {
      return await strapi.register(newUser);
    },
    onSuccess: ({ user, jwt }) => {
      authenticate(user, jwt);
      addToast({
        title: 'Bienvenue!👋',
        description: 'Votre compte a été crée avec succès.',
        type: 'success',
      });
      navigate(`/dashboard`);
    },
  });

  const onSubmit = (data: UserSignUpFields): void => {
    mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError && <ApiErrorAlert error={error} />}
      <div className="mt-4">
        <Label
          htmlFor="username"
          className="text-sm font-medium leading-5 text-gray-700"
        >
          Nom
        </Label>
        <TextInput
          id="username"
          className="w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          type="text"
          {...register('username', {
            required: 'Veuillez saisir votre nom',
            minLength: {
              value: 3,
              message: 'Le nom doit avoir au moins 3 charactères',
            },
          })}
        />
        {errors.username && (
          <p className="mt-2 text-xs text-red-600">{errors.username.message}</p>
        )}
      </div>
      <div className="mt-4">
        <Label
          htmlFor="email"
          className="text-sm font-medium leading-5 text-gray-700"
        >
          Addresse E-mail
        </Label>
        <div className="mt-1 rounded-md">
          <TextInput
            id="email"
            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm ${
              !!email && 'cursor-not-allowed'
            }`}
            type="email"
            {...register('email', {
              required: 'Veuillez saisir votre email',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Not a valid email',
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
          className="text-sm font-medium leading-5 text-gray-700"
        >
          Mot de passe
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
        <span className="block w-full rounded-md shadow-sm">
          <Button type="submit" isLoading={isLoading}>
            Créer un compte
          </Button>
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
