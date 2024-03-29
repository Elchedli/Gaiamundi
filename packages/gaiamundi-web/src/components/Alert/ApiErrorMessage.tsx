import { XMarkIcon } from '@heroicons/react/24/solid';
import { ApiError } from 'interfaces/api';
import { FC } from 'react';
import { Alert } from './Alert';

export const ApiErrorAlert: FC<{
  error: ApiError | Error | undefined;
}> = ({ error, ...rest }) => {
  if (!error) {
    return null;
  }

  return (
    <Alert
      type={'failure'}
      icon={XMarkIcon}
      additionalContent={
        error && 'description' in error ? error.description : ''
      }
      {...rest}
    >
      {'message' in error ? error.message : JSON.stringify(error)}
      {'details' in error && (
        <ul>
          {error?.details?.errors?.map((err, idx) => {
            return (
              <li key={idx}>
                {err.name}: {err.message}
              </li>
            );
          })}
        </ul>
      )}
    </Alert>
  );
};
