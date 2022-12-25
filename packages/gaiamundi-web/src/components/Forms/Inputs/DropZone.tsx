import { useState } from 'react';
import { useMutation } from 'react-query';

import Download from 'components/Icons/Download';
import { FileInputHidden } from './FileInput';
import { Label } from './Label';
import { useToast } from 'hooks/useToast';
import { UploadedFile } from 'interfaces/file';
import LoadingSpinner from 'components/Icons/LoadingSpinner';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { ApiError } from 'interfaces/api';
import config from 'config';
import { Alert } from 'components/Alert/Alert';
import { uploadGeoJson } from 'services/geo-map';

const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      if (!reader.result) {
        return reject(new Error('Unable to read the file!'));
      }
      resolve(reader.result.toString());
    };

    reader.onerror = function () {
      reject(reader.error);
    };
  });
};

const DropZone: React.FC<{
  onFileUploaded: (file: UploadedFile) => void;
}> = ({ onFileUploaded }) => {
  const { addToast } = useToast();
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateFile = async (file: File) => {
    const allowedMimTypes = ['application/geo+json', 'application/json'];
    const maxSizeInMb = 10;
    if (!allowedMimTypes.includes(file.type)) {
      setValidationError(
        `Le type de fichier est invalide ! Les types autorisés sont : ${allowedMimTypes.join(
          ','
        )}`
      );
      return false;
    }
    if (file.size > maxSizeInMb * 1024 ** 2) {
      setValidationError(
        `La taille maximale de fichier est dépassée : ${maxSizeInMb} Mo.`
      );
      return false;
    }
    try {
      const content = await readFile(file);
      const json = JSON.parse(content);
      if (json.type !== 'FeatureCollection' || !Array.isArray(json.features)) {
        setValidationError(
          `Le format GeoJSON est invalide (FeatureCollection, features).`
        );
        return false;
      }
      return true;
    } catch (e) {
      setValidationError(`Impossible de valider le format GeoJSON du fichier.`);
      return false;
    }
  };

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

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // This is done to set the displayed filename after the file is uploaded
    const files = e.dataTransfer.files;
    if (files.length === 0) {
      return;
    }

    mutateAsync({ file: files[0] });
  };

  const onUpload = async (file: File) => {
    const isValid = await validateFile(file);
    // This is done to set the displayed filename after the file is uploaded
    if (isValid) {
      mutateAsync({ file });
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
      {validationError && <Alert>{validationError}</Alert>}
      <div
        onDrop={handleDrop}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
      >
        <Label
          htmlFor="dropzone-file"
          className="flex flex-col border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {file ? (
              <img
                src={`${config.API_URL}/api/geo-maps/thumbnail/${file.id}`}
                width={128}
                height={128}
              />
            ) : (
              <Download />
            )}
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              {file ? (
                file.name
              ) : (
                <span>
                  <span className="font-semibold">Cliquer pour ajouter </span>
                  ou glisser et déposer
                </span>
              )}
            </p>
          </div>
          <FileInputHidden onUpload={onUpload} />
        </Label>
      </div>
    </div>
  );
};

export default DropZone;
