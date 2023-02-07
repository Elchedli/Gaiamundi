import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { UploadedFile } from 'interfaces/file';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { Alert } from 'components/Alert/Alert';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { Button } from 'components/Button/Button';
import { Label } from 'components/Forms/Inputs/Label';
import { TextInput } from 'components/Forms/Inputs/TextInput';
import { ToggleSwitch } from 'components/Forms/Inputs/ToggleSwitch';
import { useRequireAuth } from 'hooks/useRequireAuth';
import { useToast } from 'hooks/useToast';
import { ApiError } from 'interfaces/api';
import { Column } from 'interfaces/column';
import { DatasetStub } from 'interfaces/dataset';
import { addDataToPageCarto } from 'services/dataset';
import { CsvUploader } from './CsvUploader';
import { DatasetColumnPicker } from './DatasetColumnPicker';

type FormData = DatasetStub & {
  fragmentName: string;
  columns: Column[];
};

type PageCartoDataFormProps = {
  pageCartoId: number;
  onSubmit: (dataForm: FormData) => void;
};

export const PageCartoDataForm: FC<PageCartoDataFormProps> = ({
  pageCartoId,
  onSubmit,
}) => {
  const queryClient = useQueryClient();
  const { user } = useRequireAuth();
  const [columns, setColumns] = useState<Column[]>([]);
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    control,
  } = useForm<FormData>();

  const { isError, error, isLoading, mutateAsync } = useMutation({
    mutationFn: async ({ columns, fragmentName, ...dataset }: FormData) => {
      return await addDataToPageCarto(
        pageCartoId,
        fragmentName,
        { ...dataset, owner: user?.id || 0 },
        columns
      );
    },
    onSuccess: (_response, formData) => {
      addToast({
        title: 'Jeu de données importé',
        description: `Votre jeu de données a été crée avec succès`,
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['page-carto', pageCartoId] });
      onSubmit(formData);
    },
  });

  const handleFileUpload = (file: UploadedFile) => {
    setValue('name', file?.name || '');
    setValue('fragmentName', file?.name || '');
  };

  const handleFileCancel = () => {
    setValue('name', '');
    setValue('fragmentName', '');
    setColumns([]);
  };

  const handleFileParse = (columns: Column[]) => {
    setColumns(columns);
  };

  const onSubmitForm = (data: FormData) => {
    mutateAsync(data);
  };

  return (
    <div className="p-4 bg-slate-100 border border-slate-300 rounded shadow-xl">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        {isError && <ApiErrorAlert error={error as ApiError} />}
        <div className="flex flex-row">
          <div className="flex flex-col w-1/2 p-2">
            <div className="mt-3">
              <Label htmlFor="name">
                1. Uploader des données à partir d&apos;un fichier CSV
              </Label>
              <Controller
                name="csv"
                control={control}
                defaultValue={undefined}
                rules={{
                  required: 'Le fichier CSV est obligatoire',
                }}
                render={({ field }) => {
                  return (
                    <CsvUploader
                      onUpload={handleFileUpload}
                      onParse={handleFileParse}
                      onCancel={handleFileCancel}
                      {...field}
                    />
                  );
                }}
              />
              {errors.csv && (
                <div className="mt-2 text-xs text-red-600">
                  {errors.csv.message}
                </div>
              )}
            </div>
            <div className="mt-3">
              <Label>2. Sélectionnez les colonnes à utiliser :</Label>
              <Controller
                name="columns"
                control={control}
                defaultValue={undefined}
                rules={{
                  required:
                    'Vous devez sélectionner les colonnes ainsi que le Géo Code.',
                  validate: (cols) => {
                    return cols.length > 0 && cols.some((c) => c.isGeoCode);
                  },
                }}
                render={({ field }) => {
                  return <DatasetColumnPicker data={columns} {...field} />;
                }}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 p-2">
            <div className="mt-3">
              <Label htmlFor="name">Nom du jeu de données</Label>
              <TextInput
                id="fragmentName"
                className="w-full"
                {...register('fragmentName', {
                  required: `Veuillez saisir le nom de votre jeu de données`,
                })}
              />
              {errors.fragmentName && (
                <div className="mt-2 text-xs text-red-600">
                  {errors.fragmentName.message}
                </div>
              )}
            </div>
            <div className="mt-3">
              <Label htmlFor="origin">Origine du fichier</Label>
              <TextInput
                id="origin"
                className="w-full"
                {...register('origin', {
                  required: `Veuillez saisir l'origine de votre fichier de données`,
                })}
              />
              {errors.origin && (
                <div className="mt-2 text-xs text-red-600">
                  {errors.origin.message}
                </div>
              )}
            </div>
            <div className="mt-3">
              <ToggleSwitch
                label={'Accès Public'}
                defaultChecked={false}
                onChange={(v) => {
                  setValue('isPublic', v);
                }}
              />
              <Alert
                className="p-2 text-xs"
                type="warning"
                icon={ExclamationTriangleIcon}
              >
                Attention: Risque de non conformité <br />
                <small>
                  (Origine du fichier, source et validité des colonnes)
                </small>
              </Alert>
            </div>
            <div className="flex justify-end mt-3">
              <Button
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
