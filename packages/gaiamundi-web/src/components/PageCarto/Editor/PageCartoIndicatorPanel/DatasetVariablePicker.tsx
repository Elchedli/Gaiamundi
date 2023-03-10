import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { TextInput } from 'components/Inputs/TextInput';
import { usePageCarto } from 'hooks/usePageCarto';
import { Column } from 'interfaces/column';
import { IndicatorVariable } from 'interfaces/indicator';
import React, { useEffect, useMemo, useState } from 'react';
import DataGrid, {
  Column as DataGridColumn,
  SelectColumn,
} from 'react-data-grid';
import { getCharRange } from 'utils/utils';

type DatasetVariablePickerProps = {
  onChange: (variables: IndicatorVariable[]) => void;
};

const ALPHABET_RANGE = getCharRange('A', 'Z');

const DatasetVariablePicker = React.forwardRef<
  HTMLDivElement,
  DatasetVariablePickerProps
>(({ onChange }, ref) => {
  const { columns } = usePageCarto();
  const [selectedColumns, setSelectedColumns] = useState<ReadonlySet<string>>(
    () => new Set<string>()
  );
  const [searchKeywords, setSearchKeywords] = useState<string>('');

  const filteredRows = useMemo(() => {
    return searchKeywords
      ? columns.filter((row) => {
          return row.name.includes(searchKeywords);
        })
      : columns;
  }, [columns, searchKeywords]);

  const handleRowSelect = (selection: Set<string>) => {
    setSelectedColumns(selection);
  };

  useEffect(() => {
    const selected = Array.from(selectedColumns).map((name, idx) => {
      return {
        columnName: name,
        alias: ALPHABET_RANGE[idx],
      };
    });
    onChange(selected);
  }, [onChange, selectedColumns]);

  const dataGridColumns: DataGridColumn<Column>[] = [
    SelectColumn,
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
  ];

  return (
    <div className="border-slate-300" ref={ref}>
      <TextInput
        id="keywords"
        className="w-full mb-2"
        icon={MagnifyingGlassIcon}
        value={searchKeywords}
        onChange={(e) => setSearchKeywords(e.target.value)}
        autoComplete={'false'}
      />
      <DataGrid
        defaultColumnOptions={{
          sortable: false,
          resizable: true,
        }}
        className="fill-grid"
        rowKeyGetter={({ name }) => name}
        columns={dataGridColumns}
        rows={filteredRows}
        selectedRows={selectedColumns}
        onSelectedRowsChange={handleRowSelect}
      />
    </div>
  );
});

DatasetVariablePicker.displayName = 'DatasetVariablePicker';

export default DatasetVariablePicker;
