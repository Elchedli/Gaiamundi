import { FC } from 'react';
import { PageCartoDataForm } from './PageCartoDataForm';
import { DatasetColumn } from 'interfaces/dataset-column';
import { ApiCollection } from 'interfaces/api';
import DataGrid from 'react-data-grid';

type PageCartoPanelDataProps = {
  columns: ApiCollection<DatasetColumn>;
};

export const PageCartoPanelData: FC<PageCartoPanelDataProps> = ({
  columns,
}) => {
  return (
    <div>
      <div className="my-2">
        {columns.data.length > 0 && (
          <DataGrid
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
            rows={(columns.data || []).map((column) => {
              return {
                id: column.id,
                ...column.attributes,
                dataset: column.attributes.dataset.data.attributes.name,
              };
            })}
          />
        )}
      </div>
      <div className="mt-5">
        <PageCartoDataForm />
      </div>
    </div>
  );
};
