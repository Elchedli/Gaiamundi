import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Radio } from 'components/Forms/Inputs/Radio';
import { TextInput } from 'components/Forms/Inputs/TextInput';
import { GeoProperty } from 'interfaces/geo-map';
import React, { useEffect, useMemo, useState } from 'react';
import DataGrid, {
  Column as DataGridColumn,
  SelectColumn,
} from 'react-data-grid';

type GeoPropertyPickerProps = {
  data: GeoProperty[];
  onChange: (selectedGeoProperties: GeoProperty[]) => void;
};

const GeoPropertyPicker = React.forwardRef<
  HTMLDivElement,
  GeoPropertyPickerProps
>(({ data, onChange }, ref) => {
  const [selectedGeoProperties, setSelectedGeoProperties] = useState<
    ReadonlySet<string>
  >(() => new Set<string>());
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
    setSelectedGeoProperties(selection);
    if (selectedGeoCode && !selection.has(selectedGeoCode)) {
      setSelectedGeoCode(null);
    }
  };

  const handleGeoCodeSelect = (selected: string) => {
    setSelectedGeoCode(selected);
  };

  useEffect(() => {
    const selected = Array.from(selectedGeoProperties)
      .map((name) => {
        return data.find((row) => row.name === name);
      })
      .map(
        (column) =>
          ({
            ...column,
            isGeoCode: column?.name === selectedGeoCode,
          } as GeoProperty)
      );
    onChange(selected);
  }, [selectedGeoProperties, selectedGeoCode]);

  const columns: DataGridColumn<GeoProperty>[] = [
    SelectColumn,
    {
      key: 'isGeoCode',
      name: 'GéoCode',
      width: 80,
      minWidth: 80,
      maxWidth: 80,
      formatter({ row }) {
        return selectedGeoProperties.has(row.name) ? (
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
      name: 'Nom',
    },
    {
      key: 'sample',
      name: 'Example',
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
        selectedRows={selectedGeoProperties}
        onSelectedRowsChange={handleRowSelect}
      />
    </div>
  );
});

GeoPropertyPicker.displayName = 'GeoPropertyPicker';

export default GeoPropertyPicker;
