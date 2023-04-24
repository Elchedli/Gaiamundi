import { PlusIcon } from '@heroicons/react/24/solid';
import { Alert } from 'components/Alert/Alert';
import { Button } from 'components/Button/Button';
import { ListBoxInput } from 'components/Inputs/ListBoxInput';
import { Radio } from 'components/Inputs/Radio';
import { ToggleSwitch } from 'components/Inputs/ToggleSwitch';
import config from 'config';
import { useIndicator } from 'hooks/useIndicator';
import { useModal } from 'hooks/useModal';
import { usePageCarto } from 'hooks/usePageCarto';
import { FC } from 'react';
import DataGrid from 'react-data-grid';
import { PageCartoIndicatorForm } from './PageCartoIndicatorForm';

export const PageCartoIndicatorPanel: FC = () => {
  const { showModal, hideModal } = useModal();
  const { pageCartoId, columns, indicators: dataGridRows } = usePageCarto();
  const { changeIndicator, changePalette } = useIndicator();
  const options = [
    { label: 'Rouge', value: 'red' },
    { label: 'Marron', value: 'brown' },
    { label: 'Chinois', value: 'chinese' },
    { label: 'Non chinois (palette)', value: 'noChinese' },
  ];

  const changeIndicatorMap = (indicatorName: string, type: string) =>
    changeIndicator({ indicatorName, type });

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
                key: 'basic',
                name: 'Fond',
                formatter: ({ row }) => (
                  <Radio
                    name="indicator"
                    onChange={() => changeIndicatorMap(row.name, 'basic')}
                  />
                ),
              },
              {
                key: 'round',
                name: 'Rond',
                formatter: ({ row }) => (
                  <Radio
                    name="indicator"
                    onChange={() => changeIndicatorMap(row.name, 'round')}
                  />
                ),
              },
              {
                key: 'id',
                name: '#',
              },
              {
                key: 'name',
                name: 'Indicateurs',
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
      {/* bottom half indicator interface */}
      <div className="mt-8 [&>*]:mt-5">
        <ToggleSwitch
          label={'Diamétre proportionel à la valeur'}
          defaultChecked={true}
          onChange={(_v) => {
            // setValue('isPublic', v);
          }}
        />
        <div>
          <span>Quantile : </span>
          <select name="quantile" className="p-2" defaultValue="1">
            <option value="1">1</option>
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
            defaultValue={'rouge'}
            options={options}
            onChange={(value: string) => changePalette(value)}
          />
        </div>
        <div className="w-fit mx-auto">
          <Button className="">Afficher</Button>
        </div>
      </div>
    </div>
  );
};
