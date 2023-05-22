import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Button } from 'components/Button/Button';
import { Label } from 'components/Inputs/Label';
import { TextAreaInput } from 'components/Inputs/TextAreaInput';
import { TextInput } from 'components/Inputs/TextInput';
import { LoadingMessage } from 'components/Loader/LoadingMessage';
import { useToast } from 'hooks/useToast';
import { ApiData, ApiError } from 'interfaces/api';
import { DatasetColumn } from 'interfaces/column';
import { IndicatorBase, IndicatorStub } from 'interfaces/indicator';
import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  getOneIndicatorByPageCarto,
  updateIndicatorToPageCarto,
} from 'services/indicator';
import DatasetVariablePicker from './DatasetVariablePicker';
import EquationInput from './EquationInput';

type PropsUpdateIndicatorForm = {
  pageCartoId: number;
  indicator: ApiData<IndicatorStub>;
  columns: DatasetColumn[];
  onSubmit: (dataForm: IndicatorStub) => void;
};
export const UpdateIndicator: FC<PropsUpdateIndicatorForm> = ({
  pageCartoId,
  indicator,
  columns,
  onSubmit,
}) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const {
    data,
    isLoading: isLoadingQuery,
    isError: isErrorQuery,
    error: errorQuery,
  } = useQuery(['indicator', indicator.id, pageCartoId], () =>
    getOneIndicatorByPageCarto(indicator.id, pageCartoId)
  );
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<IndicatorStub>();

  useEffect(() => {
    if (data) {
      reset({
        name: data.data.name,
        description: data.data.description,
        equation: data.data.equation,
        source: data.data.source,
        validity: data.data.validity,
        variables: data.data.variables,
      });
    }
  }, [data, reset]);

  const { mutateAsync, isLoading, error, isError } = useMutation(
    async (updateData: IndicatorBase) => {
      return await updateIndicatorToPageCarto(indicator.id, updateData);
    },
    {
      onSuccess: (_response, formData) => {
        addToast({
          title: 'Indicateur modifié',
          description: `Votre indicateur a été modifié avec succès`,
          type: 'success',
        });
        queryClient.invalidateQueries(['indicator', indicator.id]);
        onSubmit(formData);
      },
    }
  );

  const onSubmitForm = (data: IndicatorStub) => {
    mutateAsync(data);
  };
  if (isLoadingQuery || !data) {
    return (
      <div>
        <LoadingMessage />
      </div>
    );
  }
  if (isErrorQuery) {
    return <ApiErrorAlert error={errorQuery as ApiError} />;
  }

  const formValues = watch();

  return (
    <div
      className="p-4 bg-slate-100 border border-slate-300 rounded shadow-xl"
      data-testid="update-indicator-form"
    >
      <form onSubmit={handleSubmit(onSubmitForm)}>
        {isError && <ApiErrorAlert error={error as ApiError} />}
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2 p-2">
            <div className="mt-3">
              <Label>1. Sélectionnez les colonnes à utiliser :</Label>
              <Controller
                name="variables"
                control={control}
                defaultValue={data.data.variables}
                rules={{
                  required:
                    'Vous devez sélectionner les colonnes ainsi que le Géo Code.',
                  validate: (variables) => {
                    return variables.length > 0;
                  },
                }}
                render={({ field }) => {
                  return (
                    <DatasetVariablePicker
                      columns={columns}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 p-2">
            <div className="mt-3">
              <Label htmlFor="name">Nom</Label>
              <TextInput
                data-testid="name-input"
                id="name"
                className="w-full"
                {...register('name', {
                  required: `Veuillez saisir le nom de l'indicateur`,
                })}
              />
              {errors.name && (
                <div className="mt-2 text-xs text-red-600">
                  {errors.name.message}
                </div>
              )}
            </div>
            <div className="mt-3">
              <Label htmlFor="description">Description</Label>
              <TextAreaInput
                data-testid="description-input"
                id="description"
                {...register('description', {
                  required: `Veuillez saisir la description`,
                })}
              />
              {errors.description && (
                <div className="mt-2 text-xs text-red-600">
                  {errors.description.message}
                </div>
              )}
            </div>
            <div className="mt-3">
              <Label htmlFor="source">Source</Label>
              <TextInput
                data-testid="source-input"
                id="source"
                className="w-full"
                {...register('source', {
                  required: `Veuillez saisir la source de l'indicateur`,
                })}
              />
              {errors.source && (
                <div className="mt-2 text-xs text-red-600">
                  {errors.source.message}
                </div>
              )}
            </div>
            <div className="mt-2">
              <Label htmlFor="validity">Validity</Label>
              <TextInput
                data-testid="input-validity"
                id="validity"
                {...register('validity', {
                  required: `Veuillez saisir l'année de validté de l'indicateur`,
                })}
              />
              {errors.validity && (
                <div className="mt-2 text-xs text-red-600">
                  {errors.validity.message}
                </div>
              )}
            </div>
            <div className="mt-2">
              <Controller
                name="equation"
                control={control}
                defaultValue={data.data.equation}
                rules={{
                  required: 'Vous devez définir une formule de calcul.',
                }}
                render={({ field }) => {
                  return (
                    <EquationInput
                      variables={formValues.variables || []}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  );
                }}
              />
            </div>
            <div className="flex justify-end mt-3">
              <Button
                data-testid="submit-button"
                type="submit"
                size="lg"
                isLoading={isLoading}
              >
                Valider
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
