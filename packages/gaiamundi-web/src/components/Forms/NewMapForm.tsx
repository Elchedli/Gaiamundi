import DropZone from './Inputs/DropZone';
import { Label } from './Inputs/Label';
import { TextInput } from './Inputs/TextInput';
import { useFormContext } from 'react-hook-form';

export const NewMapForm = ({
  setGeoJsonFileId,
}: {
  setGeoJsonFileId: (id: number) => void;
}) => {
  const {
    register,
    getFieldState,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods
  return (
    <div className="grid lg:grid-cols-2">
      <DropZone setGeoJsonFileId={setGeoJsonFileId} />
      <div className="px-5">
        <div>
          <Label htmlFor="Nom">Nom</Label>
          <TextInput
            id="mapName"
            className="w-full"
            {...register('mapName', {
              required: 'Veuillez saisir le nom du carte',
            })}
          />
          {errors.mapName && (
            <div className="mt-2 text-xs text-red-600">
              {getFieldState('mapName')?.error?.message}
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="Annee">Année de validité</Label>
          <TextInput
            id="yearValidity"
            className="w-full"
            {...register('yearValidity', {
              required: "Veuillez saisir l'année de validité",
            })}
          />
          {errors.yearValidity && (
            <div className="mt-2 text-xs text-red-600">
              {getFieldState('yearValidity')?.error?.message}
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="Source">Source</Label>
          <TextInput
            id="source"
            className="w-full"
            {...register('source', {
              required: 'Veuillez saisir la source',
            })}
          />
          {errors.source && (
            <div className="mt-2 text-xs text-red-600">
              {getFieldState('source')?.error?.message}
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="License">License</Label>
          <TextInput
            id="license"
            className="w-full"
            {...register('license', {
              required: 'Veuillez saisir la license',
            })}
          />
          {errors.license && (
            <div className="mt-2 text-xs text-red-600">
              {getFieldState('license')?.error?.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
