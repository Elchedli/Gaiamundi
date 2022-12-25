import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import DropZone from './Inputs/DropZone';
import { Label } from './Inputs/Label';
import { TextInput } from './Inputs/TextInput';
import { UploadedFile } from 'interfaces/file';
import { PageCartoForm } from 'interfaces/page-carto';

export const NewMapForm: FC<{
  onFileUploaded: (file: UploadedFile) => void;
}> = ({ onFileUploaded }) => {
  const {
    register,
    getFieldState,
    formState: { errors },
  } = useFormContext<PageCartoForm>(); // retrieve all hook methods
  return (
    <div className="grid lg:grid-cols-2">
      <DropZone onFileUploaded={onFileUploaded} />
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
      </div>
    </div>
  );
};
