import { PlusIcon } from '@heroicons/react/24/solid';
import { Alert } from 'components/Alert/Alert';
import { Button } from 'components/Button/Button';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import { ToggleSwitch } from 'components/Inputs/ToggleSwitch';
import config from 'config';
import { useModal } from 'hooks/useModal';
import { usePageCarto } from 'hooks/usePageCarto';
import { FC } from 'react';
import DataGrid from 'react-data-grid';
import { PageCartoIndicatorForm } from './PageCartoIndicatorForm';

export const PageCartoIndicatorPanel: FC = () => {
  const { showModal, hideModal } = useModal();
  const { pageCartoId, columns } = usePageCarto();
  const { indicators: dataGridRows } = usePageCarto();

  const options = [
    { label: 'Palettes de couleurs', value: 'default' },
    { label: 'Rouge', value: 'rouge' },
    { label: 'Marron', value: 'marron' },
    { label: 'Chinois', value: 'chinois' },
    { label: 'Non chinois (palette)', value: 'nonchinois' },
  ];

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
          />
        )}
      </div>
      <div className="flex-col">
        <span>Affichage : </span>
        <div className="inline-block">
          <input type="radio" name="type-display" />
          <span>Affichage en fond</span>
          <br />
          <input type="radio" name="type-display" />
          <span>Affichage en rond</span>
        </div>

        <ToggleSwitch
          label={'Diamétre proportionel à la valeur'}
          defaultChecked={false}
          onChange={(_v) => {
            // setValue('isPublic', v);
          }}
        />
        {/* <span>Diamétre proportionel a la valeur</span> */}
        <span>Quantile : </span>
        {/* option count menu  with arrows */}
        {/* <CounterInput value={10} /> */}
        <span>Couleurs : </span>
        <ListBoxInput
          className="mb-2 w-1/2"
          defaultValue={'default'}
          options={options}
          onChange={() => null}
        />
        {/* Options menu "Palette de couleur" */}
        <Button className="self-center">Afficher</Button>
      </div>
    </div>
  );
};
