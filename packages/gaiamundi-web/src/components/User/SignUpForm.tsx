import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Button } from 'components/Button/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { Label } from 'components/Inputs/Label';
import { TextInput } from 'components/Inputs/TextInput';
import { useAuth } from 'hooks/useAuth';
import { useModal } from 'hooks/useModal';
import { useToast } from 'hooks/useToast';
import { ApiError } from 'interfaces/api';
import {
  UserAuthResponse,
  UserSignUpFields,
  UserSignUpFormFields,
} from 'interfaces/user';
import { TermsOfUse } from 'pages/TermsOfUse/TermsOfUse';
import { signUp } from 'services/user';
import { EMAIL_REGEX, PASSWORD_REGEX } from 'utils/utils';

interface Props {
  email?: string;
}

const SignUpForm = ({ email }: Props) => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { showModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<UserSignUpFormFields>({
    mode: 'all',
    defaultValues: {
      id: 0,
      provider: 'local',
      confirmed: false,
      blocked: false,
      created_at: '',
      updated_at: '',
      username: '',
      email,
      password: '',
    },
  });
  const { authenticate } = useAuth();

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const { mutateAsync, isError, error, isLoading } = useMutation<
    UserAuthResponse,
    ApiError,
    UserSignUpFields
  >({
    mutationFn: async (newUser) => {
      return await signUp(newUser);
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
    <form onSubmit={handleSubmit(onSubmit)} data-testid="sign-up-form">
      {isError && <ApiErrorAlert error={error} />}
      <div className="mt-4">
        <Label
          htmlFor="username"
          className="text-sm font-medium leading-5 text-gray-700"
        >
          Nom
        </Label>
        <TextInput
          data-testid="name-input"
          id="username"
          className="w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          type="text"
          {...register('username', {
            required: 'Veuillez saisir votre nom.',
            minLength: {
              value: 3,
              message: 'Le nom doit avoir au moins 3 charactères.',
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
          Adresse E-mail
        </Label>
        <div className="mt-1 rounded-md">
          <TextInput
            data-testid="email-input"
            id="email"
            className="w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            type="email"
            {...register('email', {
              required: 'Veuillez saisir votre email',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Email invalide.',
              },
            })}
          />
          {errors.email && (
            <p className="mt-2 text-xs text-red-600">{errors.email.message}</p>
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
            data-testid="password-input"
            id="password"
            className="w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            type="password"
            {...register('password', {
              required: 'Veuillez saisir votre mot de passe',
              minLength: {
                value: 6,
                message:
                  'Le mot de passe doit contenir au moins 6 charactères.',
              },
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.',
              },
            })}
          />
          {errors.password && (
            <p className="mt-2 text-xs text-red-600">
              {errors.password.message}
            </p>
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
            data-testid="confirm-password-input"
            id="password2"
            className="w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            type="password"
            {...register('password2', {
              required: 'Veuillez confirmer votre mot de passe.',
              validate: (val: string) => {
                if (watch('password') != val) {
                  return 'Les mots de passes ne correspondent pas.';
                }
              },
            })}
          />
          {errors.password2 && (
            <p className="mt-2 text-xs text-red-600">
              {errors.password2.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-8 mb-8 text-sm font-medium leading-5 text-gray-700">
        <label htmlFor="check-box">
          <input
            data-testid="checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <span className="ml-2">
            J&apos;accepte les{' '}
            <Link
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              to={'#'}
              onClick={() => {
                showModal({
                  title: `Conditions d'utilisation`,
                  Component: TermsOfUse,
                });
              }}
            >
              Conditions d&apos;utilisations.
            </Link>
          </span>
        </label>
      </div>
      <div className="mt-4">
        <span className="block w-full rounded-md shadow-sm">
          <Button
            data-testid="submit-button"
            type="submit"
            disabled={!isChecked || !isValid}
            isLoading={isLoading}
          >
            Créer un compte
          </Button>
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
