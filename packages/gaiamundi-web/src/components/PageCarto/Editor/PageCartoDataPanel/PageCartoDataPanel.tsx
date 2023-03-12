import { PlusIcon } from '@heroicons/react/24/solid';
import { FC } from 'react';
import DataGrid from 'react-data-grid';

import { Alert } from 'components/Alert/Alert';
import { Button } from 'components/Button/Button';
import config from 'config';
import { useModal } from 'hooks/useModal';
import { usePageCarto } from 'hooks/usePageCarto';
import { PageCartoDataForm } from './PageCartoDataForm';

export const PageCartoDataPanel: FC = () => {
  const { showModal, hideModal } = useModal();
  const { pageCartoId } = usePageCarto();
  const { columns: dataGridRows } = usePageCarto();
  return (
    <div>
      <div className="mt-5 text-right">
        <Button
          icon={PlusIcon}
          data-testid="import-dataset"
          onClick={() =>
            showModal({
              title: 'Importer un jeu de données',
              Component: PageCartoDataForm,
              props: { pageCartoId, onSubmit: hideModal },
            })
          }
        >
          Importer un jeu de données
        </Button>
      </div>
      <div className="my-2">
        {dataGridRows.length === 0 && (
          <Alert type="info">{`Aucun jeu de donnée n'a a été importé`}</Alert>
        )}
        {dataGridRows.length > 0 && (
          <DataGrid
            enableVirtualization={config.ENVIRONMENT !== 'test'}
            className="border"
            columns={[
              {
                key: 'name',
                name: 'Colonne',
              },
              {
                key: 'source',
                name: 'Source',
              },
              {
                key: 'validity',
                name: 'Validité',
              },
              {
                key: 'dataset',
                name: 'Jeu de données',
              },
            ]}
            rows={dataGridRows}
          />
        )}
      </div>
    </div>
  );
};
