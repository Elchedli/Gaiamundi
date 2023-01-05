import { FC, useEffect, useState } from 'react';
import { UploadedFile } from 'interfaces/file';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

import { CsvUploader } from './CsvUploader';
import { useRequireAuth } from 'hooks/useRequireAuth';
import { useToast } from 'hooks/useToast';
import { Label } from 'components/Forms/Inputs/Label';
import { TextInput } from 'components/Forms/Inputs/TextInput';
import { ApiErrorAlert } from 'components/Alert/ApiErrorMessage';
import { ApiError } from 'interfaces/api';
import { Button } from 'components/Button/Button';
import { ToggleSwitch } from 'components/Forms/Inputs/ToggleSwitch';
import { DatasetStub } from 'interfaces/dataset';
import { createDataset } from 'services/dataset';
import { Alert } from 'components/Alert/Alert';
import { CsvColumn, DatasetColumnPicker } from './DatasetColumnPicker';

export const PageCartoDataForm: FC = () => {
  const { user } = useRequireAuth();
  const { addToast } = useToast();
  const [file, setFile] = useState<UploadedFile | undefined>();
  const [columns, setColumns] = useState<CsvColumn[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<DatasetStub>();

  const { isError, error, isLoading, mutateAsync } = useMutation({
    mutationFn: async (data: DatasetStub) => {
      return await createDataset({ ...data, owner: user?.id || 0 });
    },
    onSuccess: (_response, _formData) => {
      addToast({
        title: 'Jeu de données importé',
        description: `Votre jeu de données a été crée avec succès`,
        type: 'success',
      });
    },
  });

  const handleFileUpload = (file: UploadedFile) => {
    setFile(file);
  };

  const handleFileParse = (columnNames: string[] | undefined) => {
    if (Array.isArray(columnNames)) {
      const cols = columnNames.reduce((acc, curr) => {
        let metadata: { [key: string]: string } = {};
        let name = curr;
        const [match] = name.match(/\[(.+)\]/gi) || [''];
        if (match) {
          name = name.replace(match, '');
          const meta = match.slice(1, -1);
          metadata = meta.split('&').reduce((params, param) => {
            const [key, value] = param.split('=');
            params[key] = value ? value.trim() : '';
            return params;
          }, metadata);
        }
        acc.push({
          name: name.trim(),
          source: 's' in metadata ? metadata['s'] : '',
          validity: 'v' in metadata ? metadata['v'] : '',
        });
        return acc;
      }, [] as CsvColumn[]);
      console.log(cols);
      setColumns(cols);
    }
  };

  const handleFileUploadCancel = () => {
    setFile(undefined);
  };

  const onSubmit = (data: any) => {
    mutateAsync(data);
  };

  useEffect(() => {
    setValue('name', file?.name || '');
  }, [file]);

  return (
    <div className="p-4 bg-slate-100 border border-slate-300 rounded shadow-xl">
      <CsvUploader
        onFileUploaded={handleFileUpload}
        onCancel={handleFileUploadCancel}
        onFileParse={handleFileParse}
      />
      {file && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {isError && <ApiErrorAlert error={error as ApiError} />}
          <div className="flex flex-col">
            <div className="mt-3">
              <Label htmlFor="name">Nom du jeu de données</Label>
              <TextInput
                id="name"
                className="w-full"
                {...register('name', {
                  required: `Veuillez saisir le nom de votre jeu de données`,
                })}
              />
              {errors.name && (
                <div className="mt-2 text-xs text-red-600">
                  {errors.name.message}
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
            <div>
              <TextInput
                id="csv"
                type={'hidden'}
                {...register('csv', {
                  required: 'Le fichier CSV est obligatoire',
                })}
              />
            </div>
            <div>
              <DatasetColumnPicker columns={columns} />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                className="inline-flex justify-center"
                isLoading={isLoading}
              >
                Valider
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
