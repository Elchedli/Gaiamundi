import { createContext, FC, useContext, useMemo, useState } from 'react';
import DataGrid, {
  HeaderRendererProps,
  SelectColumn,
  useFocusRef,
} from 'react-data-grid';

// import { TextInput } from 'components/Forms/Inputs/TextInput';
import { Label } from 'components/Forms/Inputs/Label';
import { TextInput } from 'components/Forms/Inputs/TextInput';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

function inputStopPropagation(event: React.KeyboardEvent<HTMLInputElement>) {
  if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.stopPropagation();
  }
}

export type CsvColumn = { name: string; source: string; validity: string };

type Filter = Pick<CsvColumn, 'name'>;

// Context is needed to read filter values otherwise columns are
// re-created when filters are changed and filter loses focus
const FilterContext = createContext<Filter | undefined>(undefined);

function FilterRenderer<R, SR, T extends HTMLOrSVGElement>({
  isCellSelected,
  column,
  children,
}: HeaderRendererProps<R, SR> & {
  children: (args: {
    ref: React.RefObject<T>;
    tabIndex: number;
    filters: Filter;
  }) => React.ReactElement;
}) {
  const filters = useContext(FilterContext)!;
  const { ref, tabIndex } = useFocusRef<T>(isCellSelected);

  return (
    <div className="flex flex-col leading-3">
      <Label
        htmlFor="keywords"
        className="block text-sm font-medium leading-5 text-gray-700 mt-px pt-2"
      >
        {column.name}
      </Label>
      {children({ ref, tabIndex, filters })}
    </div>
  );
}

export const DatasetColumnPicker: FC<{ columns: CsvColumn[] }> = ({
  columns: rows,
}) => {
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(
    () => new Set()
  );
  const [filters, setFilters] = useState<Filter>({
    name: '',
  });

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      return filters.name ? r.name.includes(filters.name) : true;
    });
  }, [rows, filters]);

  return (
    <FilterContext.Provider value={filters}>
      <h2 className="py-2">Sélectionnez les colonnes à utiliser :</h2>
      <DataGrid
        className="border"
        rowKeyGetter={({ name }) => name}
        columns={[
          SelectColumn,
          {
            key: 'name',
            name: 'Colonne',
            headerRenderer: (p) => (
              <FilterRenderer<CsvColumn, unknown, HTMLInputElement> {...p}>
                {({ filters, ...rest }) => {
                  return (
                    <TextInput
                      id="keywords"
                      sizing="sm"
                      className="w-full"
                      icon={MagnifyingGlassIcon}
                      {...rest}
                      value={filters.name}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          name: e.target.value,
                        })
                      }
                      onKeyDown={inputStopPropagation}
                      autoComplete={'false'}
                    />
                  );
                }}
              </FilterRenderer>
            ),
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
        rows={filteredRows}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        headerRowHeight={70}
      />
    </FilterContext.Provider>
  );
};
