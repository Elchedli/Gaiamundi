import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { TextInput } from 'components/Inputs/TextInput';
import { Column, DatasetColumn } from 'interfaces/column';
import { IndicatorVariable } from 'interfaces/indicator';
import React, { useEffect, useMemo, useState } from 'react';
import DataGrid, {
  Column as DataGridColumn,
  SelectColumn,
} from 'react-data-grid';
import { getCharRange } from 'utils/utils';

type DatasetVariablePickerProps = {
  columns: DatasetColumn[];
  onChange: (variables: IndicatorVariable[]) => void;
};

const ALPHABET_RANGE = getCharRange('A', 'Z');

const DatasetVariablePicker = React.forwardRef<
  HTMLDivElement,
  DatasetVariablePickerProps
>(({ columns, onChange }, ref) => {
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
      const selectedColumn = columns.find((column) => column.name === name);
      return {
        columnName: name,
        alias: ALPHABET_RANGE[idx],
        sample: selectedColumn ? selectedColumn.sample : 1,
      };
    });
    onChange(selected);
  }, [columns, onChange, selectedColumns]);
  const dataGridColumns: DataGridColumn<Column>[] = [
    SelectColumn,
    {
      key: 'name',
      name: 'Colonne',
    },
    {
      key: 'sample',
      name: 'Échantillon',
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
