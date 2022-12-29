import { useForm } from 'react-hook-form';
import { useRequireAuth } from 'hooks/useRequireAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from 'hooks/useToast';
import { UserSignUpFields } from 'interfaces/user';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { ApiError } from 'interfaces/api';
import { useMutation } from 'react-query';
import { Label } from 'components/Forms/Inputs/Label';
import { TextInput } from 'components/Forms/Inputs/TextInput';
import { EMAIL_REGEX } from 'utils/utils';
import { Button } from 'components/Button/Button';
import { updateCurrentUser } from 'services/user';

export const AccountEditForm: React.FC = () => {
  const { addToast } = useToast();
  const { setUser, user } = useRequireAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpFields>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      password: user?.password,
    },
  });

  const { mutateAsync, isError, error, isLoading } = useMutation({
    mutationFn: async (data: UserSignUpFields) => {
      return await updateCurrentUser(user?.id || 0, data);
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      addToast({
        title: 'Compte mis à jour',
        description: 'Votre compte a été mis à jour avec succès',
        type: 'success',
      });
      navigate('/account');
    },
  });

  const onSubmit = (data: UserSignUpFields) => {
    mutateAsync(data);
  };
  if (!user) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isError && <ApiErrorAlert error={error as ApiError} />}
      <div>
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Mettre à jour le compte
          </h3>
          <p className="mt-1 text-sm leading-5 text-gray-500">
            Effectuez des mises à jour sur votre compte
          </p>
        </div>
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4 items-start border-t pt-5">
            <Label
              htmlFor="username"
              className="block text-sm font-medium leading-5 text-gray-700 mt-px pt-2"
            >
              Nom d&apos;utilisateur
            </Label>
            <div className="mt-0 col-span-2">
              <div className="max-w-xs">
                <TextInput
                  id="username"
                  className="w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-sm leading-5"
                  {...register('username', {
                    required: 'Veuillez saisir votre nom',
                  })}
                />
                {errors?.username && (
                  <div className="mt-2 text-xs text-red-600">
                    {errors?.username.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4 items-start border-t border-gray-200 pt-5">
            <Label
              htmlFor="email"
              className="block text-sm font-medium leading-5 text-gray-700 mt-px pt-2"
            >
              Email address
            </Label>
            <div className="mt-0 col-span-2">
              <div className="max-w-xs rounded-md shadow-sm">
                <TextInput
                  id="email"
                  className="w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-sm leading-5"
                  {...register('email', {
                    required: 'Veuillez saisir votre email',
                    pattern: {
                      value: EMAIL_REGEX,
                      message: 'Not a valid email',
                    },
                  })}
                />
                {errors?.email && (
                  <div className="mt-2 text-xs text-red-600">
                    {errors?.email.message}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4 items-start border-t border-gray-200 pt-5">
            <Label
              htmlFor="password"
              className="block text-sm font-medium leading-5 text-gray-700 mt-px pt-2"
            >
              Mot de passe
            </Label>
            <div className="mt-0 col-span-2">
              <div className="max-w-xs">
                <TextInput
                  id="password"
                  className="w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-sm leading-5"
                  type="password"
                  {...register('password', {
                    required: 'Veuillez saisir votre mot de passe',
                    minLength: {
                      value: 6,
                      message:
                        'Le mot de passe doit avoir au moins 6 charactères',
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
          </div>
        </div>
      </div>
      <div className="pt-5 mt-8 border-t flex justify-end">
        <span className="rounded-md shadow">
          <Link to="/account">
            <Button
              type="button"
              className="text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
            >
              Annuler
            </Button>
          </Link>
        </span>
        <span className="ml-3 shadow">
          <Button
            type="submit"
            className="inline-flex justify-center text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-royal-blue-600 hover:bg-royal-blue-500 focus:outline-none focus:border-royal-blue-700 focus:shadow-outline-royal-blue active:bg-royal-blue-700"
            isLoading={isLoading}
          >
            Valider
          </Button>
        </span>
      </div>
    </form>
  );
};
