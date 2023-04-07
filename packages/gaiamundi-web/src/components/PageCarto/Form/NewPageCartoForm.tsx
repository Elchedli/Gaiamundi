import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Button } from 'components/Button/Button';
import { MapPickForm } from 'components/GeoMap/Form/MapPicker';
import { Label } from 'components/Inputs/Label';
import { TextInput } from 'components/Inputs/TextInput';
import { TagsSelector } from 'components/TagsSelector/TagsSelector';
import { useRequireAuth } from 'hooks/useRequireAuth';
import { useToast } from 'hooks/useToast';
import { ApiError } from 'interfaces/api';
import { PageCartoForm, PageCartoStub } from 'interfaces/page-carto';
import { createGeoMap } from 'services/geo-map';
import { createPageCarto } from 'services/page-carto';

export const NewPageCartoForm = () => {
  const { user } = useRequireAuth();
  const { addToast } = useToast();
  const methods = useForm<PageCartoForm>();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = methods;
  const navigate = useNavigate();

  const pageCartoMutation = useMutation({
    mutationFn: async (data: PageCartoStub) => {
      return await createPageCarto({
        name: data.name,
        map: data.map,
        owner: user?.id,
        html: '',
        tags: data.tags,
      });
    },
    onSuccess: ({ data }) => {
      addToast({
        title: 'Page carto crée',
        description: `Votre nouvelle page ${data.name} a été crée avec succès`,
        type: 'success',
      });
      navigate(`/page-carto/${data.id}/edit`);
    },
    onError: (_error, data) => {
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
    if (data.mapId) {
      const pageCartoData = { ...data, map: data.mapId, html: '' };
      pageCartoMutation.mutateAsync(pageCartoData);
    } else {
      geoMapMutation.mutateAsync(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="new-page-carto-from">
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
              data-testid="carto-page-name"
              {...register('name', {
                required: 'Veuillez saisir le nom du page carto',
              })}
            />
            {errors.name && (
              <div className="mt-2 text-xs text-red-600">
                {errors.name.message}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="Tags">Tags</Label>
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              render={({ field }) => {
                return <TagsSelector {...field} />;
              }}
            />
            {errors.tags && (
              <div className="mt-2 text-xs text-red-600">
                {errors.tags.message}
              </div>
            )}
          </div>
          <div className="mr-10">
            <MapPickForm />
          </div>
          <div className="mr-10 flex justify-end">
            <Button
              type="submit"
              className="inline-flex justify-center"
              isLoading={
                geoMapMutation.isLoading || pageCartoMutation.isLoading
              }
              disabled={!isValid}
            >
              Valider
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
