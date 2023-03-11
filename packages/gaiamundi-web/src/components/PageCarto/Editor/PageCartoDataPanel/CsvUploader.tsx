import { useState } from 'react';
import { useMutation } from 'react-query';

import {
  DocumentChartBarIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';

import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Button } from 'components/Button/Button';
import LoadingSpinner from 'components/Icons/LoadingSpinner';
import DropZone from 'components/Inputs/DropZone';
import { useToast } from 'hooks/useToast';
import { ApiError } from 'interfaces/api';
import { Column } from 'interfaces/column';
import { UploadedFile } from 'interfaces/file';
import { uploadCsv } from 'services/page-carto';
import { parseCsvColumns, validateCsv } from 'utils/file';

type CsvUploaderProps = {
  onUpload: (file: UploadedFile) => void;
  onParse?: (columnNames: Column[]) => void;
  onCancel?: () => void;
  onChange: (fileId: number) => void;
};

export const CsvUploader: React.FC<CsvUploaderProps> = ({
  onUpload,
  onParse,
  onCancel,
  onChange,
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
      onUpload(data);
      onChange(data.id);
      addToast({
        title: `Fichier téléchargé`,
        description: `Fichier ${data.name} téléchargé avec succès`,
        type: 'success',
      });
    },
  });

  const handleUpload = async (csvFile: File) => {
    setErrors('');
    try {
      const data = await validateCsv(csvFile);
      if (onParse) {
        const columns = parseCsvColumns(data.meta.fields || []);
        onParse(columns);
      }

      if (Array.isArray(data.errors) && data.errors.length > 0) {
        // eslint-disable-next-line no-console
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
      mutateAsync({ file: csvFile });
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
    onCancel && onCancel();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    <ApiErrorAlert error={error as ApiError} />;
  }

  return (
    <div className="self-center">
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
        <DropZone onUpload={handleUpload} />
      )}
      {errors && (
        <Alert className="p-2 text-sm" icon={ExclamationCircleIcon}>
          {errors}
        </Alert>
      )}
    </div>
  );
};
