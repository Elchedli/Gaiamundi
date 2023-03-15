import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockDataFragmentsApiCollection } from 'utils/mocks/data';
import DatasetColumnPicker from '../DatasetColumnPicker';

const mockColumns = mockDataFragmentsApiCollection.data[0].attributes.columns;

describe('DatasetColumnPicker', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  it('should renders with correct data', () => {
    const onChangeMock = jest.fn();
    const { getByText } = render(
      <DatasetColumnPicker data={mockColumns} onChange={onChangeMock} />
    );
    mockColumns.forEach((element) => {
      expect(getByText(element.name)).toBeInTheDocument();
    });
  });

  it('should check if columns are selected or deselected', () => {
    const onChangeMock = jest.fn();

    const { container } = render(
      <DatasetColumnPicker data={mockColumns} onChange={onChangeMock} />
    );

    const columnTable = container.querySelectorAll(
      "div[role='grid']:nth-child(2) > div"
    );
    const column1 = columnTable[1];
    const column2 = columnTable[2];

    fireEvent.click(column1.querySelector('input') as HTMLElement);

    expect(column1.getAttribute('aria-selected')).toContain('true');
    expect(column2.getAttribute('aria-selected')).toContain('false');

    fireEvent.click(column2.querySelector('input') as HTMLElement);

    expect(column2.getAttribute('aria-selected')).toContain('true');
  });

  it('should filter rows based on search of the column name', () => {
    const onChangeMock = jest.fn();

    const { container, getByText } = render(
      <DatasetColumnPicker data={mockColumns} onChange={onChangeMock} />
    );

    const input = container.querySelector('input:nth-child(2)') as HTMLElement;
    const firstColumnName = mockColumns[0].name;

    const column1 = getByText(firstColumnName);
    const column2 = getByText(mockColumns[1].name);

    userEvent.type(input, firstColumnName);

    expect(column1).toBeInTheDocument();
    expect(column2).not.toBeInTheDocument();
  });

  it('should trigger onChange when geocode cell is selected', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <DatasetColumnPicker data={mockColumns} onChange={onChange} />
    );

    const dataGridRow = container.querySelectorAll(
      "div[role='grid']:nth-child(2) > div"
    )[1];
    const columnCheckbox = dataGridRow.querySelector('input[type=checkbox]');

    expect(columnCheckbox).not.toBeNull();

    fireEvent.click(columnCheckbox as Element);

    await waitFor(() => {
      const columnRadio = dataGridRow.querySelector('input[type=radio]');

      expect(columnRadio).not.toBeNull();

      fireEvent.click(columnRadio as Element);

      expect(onChange).toHaveBeenCalledWith([mockColumns[0]]);
    });
  });
});
