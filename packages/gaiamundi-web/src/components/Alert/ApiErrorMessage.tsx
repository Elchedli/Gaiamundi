import { FC } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ApiError } from 'interfaces/api';
import { Alert } from './Alert';

export const ApiErrorAlert: FC<{ error: ApiError | Error | undefined }> = ({
  error,
}) => {
  console.log(error);
  return (
    <Alert
      type={'failure'}
      icon={XMarkIcon}
      additionalContent={
        error && 'description' in error ? error.description : ''
      }
    >
      {error && 'message' in error ? error.message : JSON.stringify(error)}
    </Alert>
  );
};
