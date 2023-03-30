import { PlusIcon } from '@heroicons/react/24/solid';
import { Alert } from 'components/Alert/Alert';
import { Button } from 'components/Button/Button';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import { Radio } from 'components/Inputs/Radio';
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
    { label: 'Palettes de couleurs', value: 'default', disabled: true },
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

      <div className="mt-8 [&>*]:mt-5">
        <div className="flex">
          <span>Affichage &nbsp;: </span>
          <div className="inline-block ml-4">
            <Radio name="type-display" checked></Radio>
            <span className="ml-2">Affichage en fond</span>
            <br />
            <Radio name="type-display"></Radio>
            <span className="ml-2">Affichage en rond</span>
          </div>
        </div>

        <ToggleSwitch
          label={'Diamétre proportionel à la valeur'}
          defaultChecked={true}
          onChange={(_v) => {
            // setValue('isPublic', v);
          }}
        />

        <div>
          <span>Quantile : </span>
          <select name="quantile" className="p-2">
            <option value="1" selected>
              1
            </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br />
        </div>

        <div>
          <span>Couleurs : </span>
          <ListBoxInput
            className="mb-2 w-1/2 inline-block"
            defaultValue={'default'}
            options={options}
            onChange={() => null}
          />
        </div>
        <div className="w-fit mx-auto">
          <Button className="">Afficher</Button>
        </div>
      </div>
    </div>
  );
};
