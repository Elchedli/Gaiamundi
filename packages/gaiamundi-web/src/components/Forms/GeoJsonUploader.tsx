import { useState } from 'react';
import { useMutation } from 'react-query';
import { useToast } from 'hooks/useToast';
import { UploadedFile } from 'interfaces/file';
import LoadingSpinner from 'components/Icons/LoadingSpinner';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { ApiError } from 'interfaces/api';
import config from 'config';
import { uploadGeoJson } from 'services/geo-map';
import DropZone from './Inputs/DropZone';
import { validateGeoJsonFile } from 'utils/file';

const GeoJsonUploader: React.FC<{
  onFileUploaded: (file: UploadedFile) => void;
}> = ({ onFileUploaded }) => {
  const { addToast } = useToast();
  const [file, setFile] = useState<UploadedFile | undefined>(undefined);

  const { mutateAsync, isError, isLoading, error } = useMutation({
    mutationFn: async (data: { file: File }) => {
      return await uploadGeoJson(data.file);
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
    try {
      const isValid = await validateGeoJsonFile(file);
      // This is done to set the displayed filename after the file is uploaded
      if (isValid) {
        mutateAsync({ file });
      }
    } catch (e) {
      addToast({
        title: `Erreur lors de la validation du fichier GeoJSON`,
        description: (e as Error).message,
        type: 'error',
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    <ApiErrorAlert error={error as ApiError} />;
  }

  return (
    <div className="self-center">
      <h2>A partir d&apos;une carte GeoJSON</h2>
      {file ? (
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <img
            src={`${config.API_URL}/api/geo-maps/thumbnail/${file.id}`}
            width={128}
            height={128}
          />
          <span className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {file.name}
          </span>
        </div>
      ) : (
        <DropZone onUpload={onUpload} />
      )}
    </div>
  );
};

export default GeoJsonUploader;
