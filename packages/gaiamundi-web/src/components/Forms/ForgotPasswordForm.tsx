import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components/Button/Button';
import { useAuth } from 'hooks/useAuth';
import { ApiError } from 'interfaces/api';
import { useToast } from 'hooks/useToast';
import { EMAIL_REGEX } from 'utils/utils';
import { Label } from './Inputs/Label';
import { TextInput } from './Inputs/TextInput';

type UserEmail = { email: string };

const ForgotPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEmail>();
  const auth = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | undefined>(undefined);

  const onSubmit = (data: UserEmail) => {
    setIsLoading(true);
    setError(undefined);
    auth
      .sendPasswordResetEmail(data.email)
      .then(() => {
        addToast({
          title: 'Réinitialisation en cours ...',
          description:
            'Un email de réinitialisation de mot de passe vous a été envoyé par E-mail.',
          type: 'success',
        });
        navigate('/login');
      })
      .catch(({ error }) => {
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
        <Label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Adresse E-mail
        </Label>
        <div className="mt-1 rounded-md">
          <TextInput
            id="email"
            className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
            type="email"
            {...register('email', {
              required: 'Veuillez saisir votre adresse E-mail',
              pattern: {
                value: EMAIL_REGEX,
                message: `L'adresse E-mail est invalid !`,
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
        <span className="block w-full rounded-md shadow-sm">
          <Button type="submit" isLoading={isLoading}>
            Réinitialiser le mot de passe
          </Button>
        </span>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
