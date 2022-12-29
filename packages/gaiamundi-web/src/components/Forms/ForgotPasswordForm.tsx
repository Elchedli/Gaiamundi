import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Button } from 'components/Button/Button';
import { ApiError } from 'interfaces/api';
import { useToast } from 'hooks/useToast';
import { EMAIL_REGEX } from 'utils/utils';
import { Label } from './Inputs/Label';
import { TextInput } from './Inputs/TextInput';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { sendForgotPasswordEmail } from 'services/user';

type UserEmail = { email: string };

const ForgotPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEmail>();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const { mutateAsync, isError, error, isLoading } = useMutation<
    boolean,
    ApiError,
    string
  >({
    mutationFn: sendForgotPasswordEmail,
    onSuccess: () => {
      addToast({
        title: 'Réinitialisation en cours ...',
        description:
          'Un email de réinitialisation de mot de passe vous a été envoyé par E-mail.',
        type: 'success',
      });
      navigate('/login');
    },
  });

  const onSubmit = ({ email }: UserEmail) => {
    mutateAsync(email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError && <ApiErrorAlert error={error} />}
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
