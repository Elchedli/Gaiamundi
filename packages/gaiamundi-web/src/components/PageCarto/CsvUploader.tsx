import { useState } from 'react';
import { useMutation } from 'react-query';

import { useToast } from 'hooks/useToast';
import { UploadedFile } from 'interfaces/file';
import LoadingSpinner from 'components/Icons/LoadingSpinner';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { ApiError } from 'interfaces/api';
import DropZone from '../Forms/Inputs/DropZone';
import { validateCsv } from 'utils/file';
import {
  DocumentChartBarIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';
import { uploadCsv } from 'services/page-carto';
import { Alert } from 'components/Alert/Alert';
import { Button } from 'components/Button/Button';

type CsvUploaderProps = {
  onFileUploaded: (file: UploadedFile) => void;
  onFileParse?: (columnNames: string[] | undefined) => void;
  onCancel: () => void;
};

export const CsvUploader: React.FC<CsvUploaderProps> = ({
  onFileUploaded,
  onFileParse,
  onCancel,
}) => {
  const { addToast } = useToast();
  const [file, setFile] = useState<UploadedFile | undefined>(undefined);
  const [errors, setErrors] = useState<string>('');

  const { mutateAsync, isError, isLoading, error } = useMutation({
    mutationFn: async (data: { file: File }) => {
      return await uploadCsv(data.file);
    },
    onSuccess: (data: UploadedFile) => {
      setFile(data);
      onFileUploaded(data);
      addToast({
        title: `Fichier téléchargé`,
        description: `Fichier ${data.name} téléchargé avec succès`,
        type: 'success',
      });
    },
  });

  const onUpload = async (file: File) => {
    setErrors('');
    try {
      const data = await validateCsv(file);
      onFileParse && onFileParse(data.meta.fields);
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        console.warn(`CSV Parse errors : `, data.errors);
      }
      // This is done to set the displayed filename after the file is uploaded
      if (data.errors.length > 0) {
        setErrors(
          `Le fichier CSV contient des erreurs dans les lignes : ${data.errors
            .map((e) => e.row)
            .join(', ')}`
        );
      }
      mutateAsync({ file });
    } catch (e) {
      addToast({
        title: `Erreur lors de la validation du fichier CSV`,
        description: (e as Error).message,
        type: 'error',
      });
    }
  };

  const handleCancel = () => {
    setFile(undefined);
    setErrors('');
    onCancel();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    <ApiErrorAlert error={error as ApiError} />;
  }

  return (
    <div className="self-center">
      <h2>{`Uploader des données à partir d'un fichier CSV`}</h2>
      {file ? (
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <DocumentChartBarIcon width={64} height={64} />
          <span className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {file.name} ({file.mime})
          </span>
          <Button color="red" onClick={handleCancel} size="xs">
            Annuler
          </Button>
        </div>
      ) : (
        <DropZone onUpload={onUpload} />
      )}
      {errors && (
        <Alert className="p-2 text-sm" icon={ExclamationCircleIcon}>
          {errors}
        </Alert>
      )}
    </div>
  );
};
