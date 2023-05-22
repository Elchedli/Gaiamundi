import {
  ArrowPathIcon,
  PlusIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Alert } from 'components/Alert/Alert';
import { Button } from 'components/Button/Button';
import config from 'config';
import { useModal } from 'hooks/useModal';
import { usePageCarto } from 'hooks/usePageCarto';
import { ApiData } from 'interfaces/api';
import { Indicator } from 'interfaces/indicator';
import { FC, useState } from 'react';
import DataGrid from 'react-data-grid';
import { PageCartoDeleteIndicator } from './PageCartoDeleteIndicator';
import { PageCartoIndicatorForm } from './PageCartoIndicatorForm';
import { UpdateIndicator } from './UpdateFormIndicator';
export const PageCartoIndicatorPanel: FC = () => {
  const { showModal, hideModal } = useModal();
  const { pageCartoId, columns } = usePageCarto();
  const { indicators: dataGridRows } = usePageCarto();
  const [selectedRow, setSelectedRow] = useState<ApiData<Indicator> | null>(
    null
  );
  const handleClickDelete = () => {
    if (selectedRow) {
      showModal({
        title: 'Supprimer un indicateur',
        Component: PageCartoDeleteIndicator,
        props: {
          indicator: selectedRow,
          pageCartoId,
          onSubmit: hideModal,
        },
      });
      setSelectedRow(null);
    }
  };

  const handelClickUpdate = () => {
    if (selectedRow) {
      showModal({
        title: "Modifier l'indicateur",
        Component: UpdateIndicator,
        props: {
          indicator: selectedRow,
          pageCartoId,
          columns,
          onSubmit: hideModal,
        },
      });
    }
    setSelectedRow(null);
  };
  const handleDeselected = () => {
    setSelectedRow(null);
  };
  const rowClass = (row: ApiData<Indicator>) => {
    return row === selectedRow ? 'bg-blue-200' : '';
  };

  return (
    <div>
      <div className="mt-5 text-right">
        <Button
          icon={PlusIcon}
          data-testid="create-indicator"
          onClick={() =>
            showModal({
              title: 'Nouvel Indicateur',
              Component: PageCartoIndicatorForm,
              props: { pageCartoId, columns, onSubmit: hideModal },
            })
          }
        >
          Nouvel Indicateur
        </Button>
      </div>
      <div className="my-2">
        {dataGridRows.length === 0 && (
          <Alert type="info">{`Aucun indicateur n'a a été défini`}</Alert>
        )}
        {selectedRow && (
          <div className="flex justify-end p-1 mb-2">
            <span
              className={classNames('cursor-pointer', {
                'animate-icon-domino opacity-1 delay-0': selectedRow,
                'animate-icon-domino opacity-0 delay-0': !selectedRow,
              })}
              onClick={handelClickUpdate}
            >
              <ArrowPathIcon className="h-6 w-6" />
            </span>
            <span
              className={classNames('ml-2 cursor-pointer', {
                'animate-icon-domino opacity-1 delay-3000': selectedRow,
                'animate-icon-domino opacity-0 delay-3000': !selectedRow,
              })}
              onClick={handleClickDelete}
            >
              <TrashIcon className="h-6 w-6" />
            </span>
            <span
              className={classNames('ml-2 cursor-pointer', {
                'animate-icon-domino opacity-1 delay-6000': selectedRow,
                'animate-icon-domino opacity-0 delay-6000': !selectedRow,
              })}
              onClick={handleDeselected}
            >
              <XCircleIcon className="h-6 w-6" />
            </span>
          </div>
        )}
        {dataGridRows.length > 0 && (
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
            rows={dataGridRows}
            onRowClick={(row) => {
              setSelectedRow(row);
            }}
            rowClass={rowClass}
          />
        )}
      </div>
    </div>
  );
};
