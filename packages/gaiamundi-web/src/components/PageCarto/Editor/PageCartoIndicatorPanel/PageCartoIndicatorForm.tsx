import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Button } from 'components/Button/Button';
import { Label } from 'components/Inputs/Label';
import { TextAreaInput } from 'components/Inputs/TextAreaInput';
import { TextInput } from 'components/Inputs/TextInput';
import { useToast } from 'hooks/useToast';
import { ApiError } from 'interfaces/api';
import { DatasetColumn } from 'interfaces/column';
import { IndicatorStub } from 'interfaces/indicator';
import { addIndicatorToPageCarto } from 'services/indicator';
import DatasetVariablePicker from './DatasetVariablePicker';
import EquationInput from './EquationInput';

type PageCartoIndicatorFormProps = {
  pageCartoId: number;
  columns: DatasetColumn[];
  onSubmit: (dataForm: IndicatorStub) => void;
};

export const PageCartoIndicatorForm: FC<PageCartoIndicatorFormProps> = ({
  pageCartoId,
  columns,
  onSubmit,
}) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    watch,
  } = useForm<IndicatorStub>();

  const formValues = watch();

  const { isError, error, isLoading, mutateAsync } = useMutation({
    mutationFn: async (indicator: IndicatorStub) => {
      return await addIndicatorToPageCarto(pageCartoId, indicator);
    },
    onSuccess: (_response, formData) => {
      addToast({
        title: 'Indicateur crée',
        description: `Votre indicateur a été crée avec succès`,
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['page-carto', pageCartoId] });
      onSubmit(formData);
    },
  });

  const onSubmitForm = (data: IndicatorStub) => {
    mutateAsync(data);
  };

  return (
    <div
      className="p-4 bg-slate-100 border border-slate-300 rounded shadow-xl"
      data-testid="indicator-form"
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
                defaultValue={undefined}
                rules={{
                  required:
                    'Vous devez sélectionner les colonnes ainsi que le Géo Code.',
                  validate: (variables) => {
                    return variables.length > 0;
                  },
                }}
                render={({ field }) => {
                  return <DatasetVariablePicker columns={columns} {...field} />;
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
              <Label htmlFor="name">Description</Label>
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
              <Label>Equation</Label>
              <Controller
                name="equation"
                control={control}
                defaultValue={undefined}
                rules={{
                  required: 'Vous devez définir une formule de calcul.',
                }}
                render={({ field }) => {
                  return (
                    <EquationInput
                      variables={formValues.variables || []}
                      {...field}
                    />
                  );
                }}
              />
            </div>
            <div className="mt-3">
              <Label htmlFor="origin">Source</Label>
              <TextInput
                data-testid="source-input"
                id="source"
                className="w-full"
                {...register('source', {
                  required: `Veuillez saisir la source`,
                })}
              />
              {errors.source && (
                <div className="mt-2 text-xs text-red-600">
                  {errors.source.message}
                </div>
              )}
            </div>
            <div className="mt-3">
              <Label htmlFor="origin">Validité</Label>
              <TextInput
                data-testid="validity-input"
                id="validity"
                className="w-full"
                {...register('validity', {
                  required: `Veuillez saisir la validité`,
                })}
              />
              {errors.validity && (
                <div className="mt-2 text-xs text-red-600">
                  {errors.validity.message}
                </div>
              )}
            </div>
            <div className="flex justify-end mt-3">
              <Button
                data-testid="submit-button"
                type="submit"
                size="lg"
                isLoading={isLoading}
                disabled={!isValid}
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
