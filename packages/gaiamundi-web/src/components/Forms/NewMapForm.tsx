import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { Label } from './Inputs/Label';
import { TextInput } from './Inputs/TextInput';
import { UploadedFile } from 'interfaces/file';
import { PageCartoForm } from 'interfaces/page-carto';
import GeoJsonUploader from './GeoJsonUploader';

export const NewMapForm: FC = () => {
  const {
    register,
    getFieldState,
    formState: { errors },
    setValue,
  } = useFormContext<PageCartoForm>(); // retrieve all hook methods

  const handleGeoJsonUpload = ({ id }: UploadedFile) => {
    setValue('geoMap.geoJSON', id);
  };

  return (
    <div className="grid lg:grid-cols-2">
      <GeoJsonUploader onFileUploaded={handleGeoJsonUpload} />
      <div className="px-5">
        <div>
          <Label htmlFor="Nom">Nom</Label>
          <TextInput
            id="geoMap.name"
            className="w-full"
            {...register('geoMap.name', {
              required: 'Veuillez saisir le nom du carte',
            })}
          />
          {errors.geoMap?.name && (
            <div className="mt-2 text-xs text-red-600">
              {getFieldState('geoMap.name')?.error?.message}
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="Annee">Année de validité</Label>
          <TextInput
            id="geoMap.yearValidity"
            className="w-full"
            {...register('geoMap.yearValidity', {
              required: "Veuillez saisir l'année de validité",
            })}
          />
          {errors.geoMap?.yearValidity && (
            <div className="mt-2 text-xs text-red-600">
              {getFieldState('geoMap.yearValidity')?.error?.message}
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="Source">Source</Label>
          <TextInput
            id="geoMap.source"
            className="w-full"
            {...register('geoMap.source', {
              required: 'Veuillez saisir la source',
            })}
          />
          {errors.geoMap?.source && (
            <div className="mt-2 text-xs text-red-600">
              {getFieldState('geoMap.source')?.error?.message}
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="License">License</Label>
          <TextInput
            id="geoMap.license"
            className="w-full"
            {...register('geoMap.license', {
              required: 'Veuillez saisir la license',
            })}
          />
          {errors.geoMap?.license && (
            <div className="mt-2 text-xs text-red-600">
              {getFieldState('geoMap.license')?.error?.message}
            </div>
          )}
        </div>
        <div>
          <TextInput
            id="geoMap.geoJSON"
            type={'hidden'}
            {...register('geoMap.geoJSON', {
              required: 'Le fichier GeoJSON est obligatoire',
            })}
          />
        </div>
      </div>
    </div>
  );
};
