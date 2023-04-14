import { FC, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Label } from 'components/Inputs/Label';
import { TextInput } from 'components/Inputs/TextInput';
import { GeoProperty } from 'interfaces/geo-map';
import { PageCartoForm } from 'interfaces/page-carto';
import GeoJsonUploader from './GeoJsonUploader';
import GeoPropertyPicker from './GeoPropertyPicker';

export const MapForm: FC = () => {
  const {
    register,
    getFieldState,
    formState: { errors },
    control,
  } = useFormContext<PageCartoForm>();
  const [geoProperties, setGeoProperties] = useState<GeoProperty[]>([]);

  const handleFileCancel = () => {
    setGeoProperties([]);
  };

  const handleFileParse = (properties: GeoProperty[]) => {
    setGeoProperties(properties);
  };

  return (
    <div className="grid grid-cols-2">
      <div className="col-span-1">
        <div className="border-2 text-xs italic text-red-500 p-3">
          <p>
            * Il est possible de renseigner la source et la validité des données
            pour chaque cellule de chaque colonne du fichier CSV en utilisant la
            syntaxe suivante : COLONNE X [source=valeur&valid=valeur]
          </p>
        </div>
        <div className="px-5">
          <Label>1. Uploader un fichier GeoJSON :</Label>
          <Controller
            name="geoMap.geoJSON"
            control={control}
            defaultValue={undefined}
            rules={{
              required: 'Le fichier CSV est obligatoire',
            }}
            render={({ field }) => {
              return (
                <GeoJsonUploader
                  onParse={handleFileParse}
                  onCancel={handleFileCancel}
                  {...field}
                />
              );
            }}
          />
          {errors.geoMap?.geoJSON && (
            <div className="mt-2 text-xs text-red-600">
              {getFieldState('geoMap.geoJSON')?.error?.message}
            </div>
          )}
        </div>
        <div className="mt-3">
          <Label>2. Sélectionnez les propriétés à utiliser :</Label>
          <Controller
            name="geoMap.properties"
            control={control}
            defaultValue={undefined}
            rules={{
              required:
                'Vous devez sélectionner les propriétés ainsi que le Géo Code.',
              validate: (cols) => {
                return cols.length > 0 && cols.some((c) => c.isGeoCode);
              },
            }}
            render={({ field }) => {
              return <GeoPropertyPicker data={geoProperties} {...field} />;
            }}
          />
          {errors.geoMap?.properties && (
            <div className="mt-2 text-xs text-red-600">
              {getFieldState('geoMap.properties')?.error?.message}
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1">
        <div className="px-5">
          <div>
            <Label htmlFor="Perimetre">Perimètre</Label>
            <TextInput
              id="geoMap.perimetre"
              className="w-full"
              {...register('geoMap.perimetre', {
                required: 'Veuillez saisir le nom du carte',
              })}
            />
            {errors.geoMap?.perimetre && (
              <div className="mt-2 text-xs text-red-600">
                {getFieldState('geoMap.perimetre')?.error?.message}
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
    </div>
  );
};
