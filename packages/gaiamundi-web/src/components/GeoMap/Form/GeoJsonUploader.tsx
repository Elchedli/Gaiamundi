import React, { useState } from 'react';
import { useMutation } from 'react-query';

import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Button } from 'components/Button/Button';
import LoadingSpinner from 'components/Icons/LoadingSpinner';
import DropZone from 'components/Inputs/DropZone';
import { useToast } from 'hooks/useToast';
import { ApiError } from 'interfaces/api';
import { UploadedFile } from 'interfaces/file';
import { GeoProperty } from 'interfaces/geo-map';
import { getGeoMapThumbnailUrlById, uploadGeoJson } from 'services/geo-map';
import { parseGeoJsonProperties, validateGeoJsonFile } from 'utils/file';

type GeoJsonUploaderProps = {
  onUpload?: (file: UploadedFile) => void;
  onParse?: (attributes: GeoProperty[]) => void;
  onCancel?: () => void;
  onChange: (fileId: number) => void;
};

const GeoJsonUploader = React.forwardRef<HTMLDivElement, GeoJsonUploaderProps>(
  ({ onUpload, onParse, onCancel, onChange }, ref) => {
    const { addToast } = useToast();
    const [file, setFile] = useState<UploadedFile | undefined>(undefined);

    const { mutateAsync, isError, isLoading, error } = useMutation({
      mutationFn: async (data: { file: File }) => {
        return await uploadGeoJson(data.file);
      },
      onSuccess: (data: UploadedFile) => {
        setFile(data);
        onUpload && onUpload(data);
        onChange(data.id);
        addToast({
          title: `Fichier téléchargé`,
          description: `Fichier ${data.name} téléchargé avec succès`,
          type: 'success',
        });
      },
    });

    const handleUpload = async (file: File) => {
      try {
        const geoJson = await validateGeoJsonFile(file);
        const properties = parseGeoJsonProperties(geoJson);
        onParse && onParse(properties);
        if (properties.length > 0) {
          mutateAsync({ file });
        } else {
          addToast({
            title: `Erreur lors d'analyse du fichier GeoJSON`,
            description: `Impossible d'extraire les propriétés GeoJSON.`,
            type: 'error',
          });
        }
      } catch (e) {
        addToast({
          title: `Erreur lors de la validation du fichier GeoJSON`,
          description: (e as Error).message,
          type: 'error',
        });
      }
    };

    const handleCancel = () => {
      setFile(undefined);
      onCancel && onCancel();
    };

    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (isError) {
      <ApiErrorAlert error={error as ApiError} />;
    }

    return (
      <div className="self-center" ref={ref}>
        {file ? (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <img
              src={getGeoMapThumbnailUrlById(file.id)}
              width={128}
              height={128}
            />
            <span className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              {file.name}
            </span>
            <Button color="red" onClick={handleCancel} size="xs">
              Annuler
            </Button>
          </div>
        ) : (
          <DropZone onUpload={handleUpload} />
        )}
      </div>
    );
  }
);

GeoJsonUploader.displayName = 'GeoJsonUploader';

export default GeoJsonUploader;
