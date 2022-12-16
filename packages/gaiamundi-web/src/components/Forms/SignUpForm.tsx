import { useEffect, useState } from 'react';

import { Button } from 'components/Button/Button';
import { useAuth } from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useToast } from 'hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { UserSignUpFields } from 'interfaces/user';
import { ApiError } from 'interfaces/api';
// import { emailRegex } from 'utils/utils';
import { TextInput } from './Inputs/TextInput';
import { Label } from './Inputs/Label';

interface Props {
  email?: string;
}

const SignUpForm = ({ email }: Props) => {
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
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { user, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | undefined>(undefined);

  const onSubmit = (data: UserSignUpFields): void => {
    setIsLoading(true);
    setError(undefined);
    signUp(data)
      .then(() => {
        navigate(`/dashboard`);
        addToast({
          title: 'Bienvenue!👋',
          description: 'Votre compte a été crée avec succès.',
          type: 'success',
        });
      })
      .catch(({ error }) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error?.message && (
        <div className="p-2 mb-4 text-center text-red-500 border border-red-600 border-dashed rounded">
          <span>{error.message}</span>
        </div>
      )}
      <div className="rounded-md">
        <Label
          htmlFor="name"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Nom
        </Label>
        <TextInput
          id="username"
          className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
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
          className="block text-sm font-medium leading-5 text-gray-700"
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
              // pattern: {
              //   value: emailRegex,
              //   message: 'Not a valid email',
              // },
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
        <div className="mt-1 rounded-md">
          <TextInput
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
        <Label
          htmlFor="password2"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Confirmation du mot de passe
        </Label>
        <div className="mt-1 rounded-md">
          <TextInput
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
            Créer un compte
          </Button>
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
