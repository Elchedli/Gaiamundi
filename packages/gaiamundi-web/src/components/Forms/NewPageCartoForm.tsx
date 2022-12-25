import { useMutation } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'components/Button/Button';
import { ContentType, strapi } from 'services/strapi';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { ApiDocument, ApiError } from 'interfaces/api';
import { PageCartoAttributes } from 'interfaces/page-carto';
import { User } from 'interfaces/user';
import { useToast } from 'hooks/useToast';
import { useRequireAuth } from 'hooks/useRequireAuth';
import { MapPickForm } from './MapPickForm';
import { CartoForm } from './CartoForm';
import { useState } from 'react';

export const NewPageCartoForm = () => {
  const { user } = useRequireAuth();
  const { addToast } = useToast();
  const methods = useForm();
  const { handleSubmit } = methods;
  const [geoJsonFileId, setGeoJsonFileId]: any = useState(undefined);

  const {
    mutateAsync: mutateCartoAsync,
    isError: isCartoPageError,
    error: cartoPageError,
    isLoading: cartoLoading,
  } = useMutation({
    mutationFn: async (data: PageCartoAttributes) => {
      return await strapi.create(ContentType.PAGE_CARTOS, {
        name: data.name,
        map: data.map,
        owner: user?.id as unknown as ApiDocument<User>,
      });
    },
    onSuccess: (response) => {
      addToast({
        title: 'Page carto crée',
        description: `Votre nouvelle page ${response.data.attributes.name} a été crée avec succès`,
        type: 'success',
      });
    },
    onError: (error, data) => {
      if (!data.map) {
        addToast({
          title: 'Aucun fichier ajouté',
          description: `Veuillez d'abord télécharger un fichier geoJSON`,
          type: 'error',
        });
      }
    },
  });

  const {
    mutateAsync: mutateMapAsync,
    isError: isMapError,
    error: mapError,
    isLoading: mapLoading,
  } = useMutation({
    mutationFn: async (data: any) => {
      return await strapi.create(ContentType.GEO_MAPS, {
        name: data.mapName,
        yearValidity: data.yearValidity,
        source: data.source,
        license: data.license,
        owner: user?.id as unknown as ApiDocument<User>,
        geojson: geoJsonFileId,
      });
    },
    onSuccess: (response, formData) => {
      addToast({
        title: 'carte GeoJSON crée',
        description: `Votre nouvelle carte a été crée avec succès`,
        type: 'success',
      });
      mutateCartoAsync({
        name: formData.cartoPageName,
        map: response.data.id,
      });
    },
  });

  const onSubmit = (data: any) => {
    if (geoJsonFileId) {
      mutateMapAsync(data);
    } else {
      addToast({
        title: "Aucune fichier n'a été téléchargé",
        description: `Veuillez téléchargé un fichier.`,
        type: 'error',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {(isCartoPageError || isMapError) && (
          <ApiErrorAlert
            error={(mapError as ApiError, cartoPageError as ApiError)}
          />
        )}

        <div className="flex flex-col mt-5 p-4 rounded-lg shadow-xl">
          <CartoForm />
          <div className="mr-10">
            <MapPickForm setGeoJsonFileId={setGeoJsonFileId} />
          </div>
          <div className="mr-10 flex justify-end">
            <Button
              type="submit"
              className="inline-flex justify-center text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-royal-blue-600 hover:bg-royal-blue-500 focus:outline-none focus:border-royal-blue-700 focus:shadow-outline-royal-blue active:bg-royal-blue-700"
              isLoading={mapLoading || cartoLoading}
            >
              Valider
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
