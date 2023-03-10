import { PlusIcon } from '@heroicons/react/24/solid';
import { Alert } from 'components/Alert/Alert';
import { Button } from 'components/Button/Button';
import config from 'config';
import { useModal } from 'hooks/useModal';
import { ApiCollection } from 'interfaces/api';
import { Indicator } from 'interfaces/indicator';
import { FC, useMemo } from 'react';
import DataGrid from 'react-data-grid';
import { PageCartoIndicatorForm } from './PageCartoIndicatorForm';

type PageCartoIndicatorPanelProps = {
  indicators: ApiCollection<Indicator>;
  pageCartoId: number;
};

export const PageCartoIndicatorPanel: FC<PageCartoIndicatorPanelProps> = ({
  indicators,
  pageCartoId,
}) => {
  const { showModal, hideModal } = useModal();
  const rows = useMemo(
    () =>
      (indicators?.data || []).map(({ id, attributes }) => {
        return {
          id,
          ...attributes,
        };
      }),
    [indicators]
  );

  return (
    <div>
      <div className="mt-5 text-right">
        <Button
          icon={PlusIcon}
          data-testid="import-dataset"
          onClick={() =>
            showModal({
              title: 'Nouvel Indicateur',
              Component: PageCartoIndicatorForm,
              props: { pageCartoId, onSubmit: hideModal },
            })
          }
        >
          Nouvel Indicateur
        </Button>
      </div>
      <div className="my-2">
        {indicators?.data.length === 0 && (
          <Alert type="info">{`Aucun indicateur n'a a été défini`}</Alert>
        )}
        {indicators?.data.length > 0 && (
          <DataGrid
            enableVirtualization={config.ENVIRONMENT !== 'test'}
            className="border"
            columns={[
              {
                key: 'id',
                name: '#',
              },
              {
                key: 'name',
                name: 'Indicateur',
              },
              {
                key: 'description',
                name: 'Description',
              },
              {
                key: 'source',
                name: 'Source',
              },
              {
                key: 'validity',
                name: 'Validité',
              },
            ]}
            rows={rows}
          />
        )}
      </div>
    </div>
  );
};
