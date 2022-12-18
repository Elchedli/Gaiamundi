import { FC } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ApiError } from 'interfaces/api';
import { Alert } from './Alert';

export const ApiErrorAlert: FC<{ error: ApiError }> = ({ error }) => {
  return (
    <Alert
      type={'failure'}
      icon={XMarkIcon}
      additionalContent={error.description}
    >
      {error.message}
    </Alert>
  );
};
