import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Radio } from 'components/Inputs/Radio';
import { TextInput } from 'components/Inputs/TextInput';
import { Column } from 'interfaces/column';
import React, { useEffect, useMemo, useState } from 'react';
import DataGrid, {
  Column as DataGridColumn,
  SelectColumn,
} from 'react-data-grid';

type DatasetColumnPickerProps = {
  data: Column[];
  onChange: (selectedColumns: Column[]) => void;
};

const DatasetColumnPicker = React.forwardRef<
  HTMLDivElement,
  DatasetColumnPickerProps
>(({ data, onChange }, ref) => {
  const [selectedColumns, setSelectedColumns] = useState<ReadonlySet<string>>(
    () => new Set<string>()
  );
  const [selectedGeoCode, setSelectedGeoCode] = useState<string | null>(null);
  const [searchKeywords, setSearchKeywords] = useState<string>('');

  const filteredRows = useMemo(() => {
    return searchKeywords
      ? data.filter((row) => {
          return row.name.includes(searchKeywords);
        })
      : data;
  }, [data, searchKeywords]);

  const handleRowSelect = (selection: Set<string>) => {
    setSelectedColumns(selection);
    if (selectedGeoCode && !selection.has(selectedGeoCode)) {
      setSelectedGeoCode(null);
    }
  };

  const handleGeoCodeSelect = (selected: string) => {
    setSelectedGeoCode(selected);
  };

  useEffect(() => {
    const selected = Array.from(selectedColumns)
      .map((name) => {
        return data.find((row) => row.name === name);
      })
      .map(
        (column) =>
          ({
            ...column,
            isGeoCode: column?.name === selectedGeoCode,
          } as Column)
      );
    onChange(selected);
  }, [data, onChange, selectedColumns, selectedGeoCode]);

  const columns: DataGridColumn<Column>[] = [
    SelectColumn,
    {
      key: 'isGeoCode',
      name: 'GéoCode',
      width: 80,
      minWidth: 80,
      maxWidth: 80,
      formatter({ row }) {
        return selectedColumns.has(row.name) ? (
          <Radio
            name="isGeoCode"
            value={row.name}
            checked={row.name === selectedGeoCode}
            onChange={() => handleGeoCodeSelect(row.name)}
          />
        ) : null;
      },
      cellClass: 'text-center',
      frozen: true,
    },
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
        columns={columns}
        rows={filteredRows}
        selectedRows={selectedColumns}
        onSelectedRowsChange={handleRowSelect}
      />
    </div>
  );
});

DatasetColumnPicker.displayName = 'DatasetColumnPicker';

export default DatasetColumnPicker;
