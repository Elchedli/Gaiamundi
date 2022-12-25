import { useState } from 'react';
import { useMutation } from 'react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'components/Button/Button';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { ApiError } from 'interfaces/api';
import { PageCartoStub, PageCartoForm } from 'interfaces/page-carto';
import { useToast } from 'hooks/useToast';
import { useRequireAuth } from 'hooks/useRequireAuth';
import { MapPickForm } from './MapPickForm';
import { UploadedFile } from 'interfaces/file';
import { TextInput } from './Inputs/TextInput';
import { Label } from './Inputs/Label';
import { createPageCarto } from 'services/page-carto';
import { createGeoMap } from 'services/geo-map';

export const NewPageCartoForm = () => {
  const { user } = useRequireAuth();
  const { addToast } = useToast();
  const form = useForm<PageCartoForm>();
  const [fileUploaded, onFileUploaded] = useState<UploadedFile | undefined>(
    undefined
  );

  const pageCartoMutation = useMutation({
    mutationFn: async (data: PageCartoStub) => {
      return await createPageCarto({
        name: data.name,
        map: data.map,
        owner: user?.id,
        html: '',
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

  const geoMapMutation = useMutation({
    mutationFn: async ({ geoMap }: PageCartoForm) => {
      return await createGeoMap({
        ...geoMap,
        owner: user?.id,
        geojson: fileUploaded?.id,
      });
    },
    onSuccess: (response, formData) => {
      addToast({
        title: 'carte GeoJSON crée',
        description: `Votre nouvelle carte a été crée avec succès`,
        type: 'success',
      });
      pageCartoMutation.mutateAsync({
        name: formData.name,
        map: response.data.id,
        html: '',
      });
    },
  });

  const onSubmit = (data: PageCartoForm) => {
    if (fileUploaded) {
      geoMapMutation.mutateAsync(data);
    } else {
      addToast({
        title: 'Echec de validation',
        description: `L'upload du fichier GeoJSON est obligatoire.`,
        type: 'error',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {pageCartoMutation.isError && (
          <ApiErrorAlert error={pageCartoMutation.error as ApiError} />
        )}
        {geoMapMutation.isError && (
          <ApiErrorAlert error={geoMapMutation.error as ApiError} />
        )}

        <div className="flex flex-col mt-5 p-4 rounded-lg shadow-xl">
          <div>
            <Label htmlFor="Nom">Nom</Label>
            <TextInput
              id="cartoPageName"
              className="w-1/3"
              {...form.register('name', {
                required: 'Veuillez saisir le nom du page carto',
              })}
            />
            {form.formState.errors.name && (
              <div className="mt-2 text-xs text-red-600">
                {form.getFieldState('name')?.error?.message}
              </div>
            )}
          </div>
          <div className="mr-10">
            <MapPickForm onFileUploaded={onFileUploaded} />
          </div>
          <div className="mr-10 flex justify-end">
            <Button
              type="submit"
              className="inline-flex justify-center text-sm font-medium leading-5 text-white transition duration-150 ease-in-out border border-transparent rounded-md bg-royal-blue-600 hover:bg-royal-blue-500 focus:outline-none focus:border-royal-blue-700 focus:shadow-outline-royal-blue active:bg-royal-blue-700"
              isLoading={
                geoMapMutation.isLoading || pageCartoMutation.isLoading
              }
            >
              Valider
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
