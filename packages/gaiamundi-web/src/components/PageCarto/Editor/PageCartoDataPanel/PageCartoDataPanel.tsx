import { PlusIcon } from '@heroicons/react/24/solid';
import { Alert } from 'components/Alert/Alert';
import { Button } from 'components/Button/Button';
import { useModal } from 'hooks/useModal';
import { ApiCollection } from 'interfaces/api';
import { Column } from 'interfaces/column';
import { DataFragment } from 'interfaces/data-fragment';
import { FC, useMemo } from 'react';
import DataGrid from 'react-data-grid';
import { PageCartoDataForm } from './PageCartoDataForm';

type PageCartoPanelDataProps = {
  dataFragments: ApiCollection<DataFragment>;
  pageCartoId: number;
  isTested?: boolean;
};

export const PageCartoPanelData: FC<PageCartoPanelDataProps> = ({
  dataFragments,
  pageCartoId,
  isTested = false,
}) => {
  const { showModal, hideModal } = useModal();

  const fragments = dataFragments?.data || [];
  const rows = useMemo(
    () =>
      fragments.reduce((acc, curr) => {
        const cols = curr.attributes.columns
          .filter((column) => {
            return !column.isGeoCode;
          })
          .map((column) => {
            return {
              ...column,
              dataset: curr.attributes.dataset.data.attributes.name,
            };
          });
        return acc.concat(cols);
      }, [] as (Column & { dataset: string })[]),
    [dataFragments]
  );
  return (
    <div>
      <div className="mt-5 text-right">
        <Button
          icon={PlusIcon}
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
        {fragments.length === 0 && (
          <Alert type="info">{`Aucun jeu de donnée n'a a été importé`}</Alert>
        )}
        {fragments.length > 0 && (
          <DataGrid
            enableVirtualization={!isTested}
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
            rows={rows}
          />
        )}
      </div>
    </div>
  );
};
