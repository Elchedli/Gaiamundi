import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockDataFragmentsApiCollection } from 'utils/mocks/data';
import DatasetColumnPicker from '../DatasetColumnPicker';

const columns = mockDataFragmentsApiCollection.data[0].attributes.columns;

describe('DatasetColumnPicker', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  it('renders with correct data', () => {
    const onChangeMock = jest.fn();
    const { getByText } = render(
      <DatasetColumnPicker data={columns} onChange={onChangeMock} />
    );
    columns.forEach((element) => {
      expect(getByText(element.name)).toBeInTheDocument();
    });
  });

  it('selects and deselects columns', () => {
    const onChangeMock = jest.fn();
    const { container } = render(
      <DatasetColumnPicker data={columns} onChange={onChangeMock} />
    );
    const columnTable = container.querySelectorAll(
      "div[role='grid']:nth-child(2) > div"
    );
    const column1 = columnTable[1];
    const column2 = columnTable[2];
    column1.querySelector('input')?.click();
    expect(column1.getAttribute('aria-selected')).toContain('true');
    expect(column2.getAttribute('aria-selected')).toContain('false');
    column2.querySelector('input')?.click();
    expect(column2.getAttribute('aria-selected')).toContain('true');
  });

  it('filters rows based on search', () => {
    const onChangeMock = jest.fn();

    const { container, getByText } = render(
      <DatasetColumnPicker data={columns} onChange={onChangeMock} />
    );

    const input = container.querySelector('input:nth-child(2)') as HTMLElement;
    const firstColumnName = columns[0].name;

    const column1 = getByText(firstColumnName);
    const column2 = getByText(columns[1].name);

    userEvent.type(input, firstColumnName);
    expect(column1).toBeInTheDocument();
    expect(column2).not.toBeInTheDocument();
  });

  it('selects geoCode column', async () => {
    const onChange = jest.fn();

    const { container } = render(
      <DatasetColumnPicker data={columns} onChange={onChange} />
    );

    container
      .querySelectorAll("div[role='grid']:nth-child(2) > div")[1]
      .querySelector('input')
      ?.click();
    container
      .querySelectorAll("div[role='grid']:nth-child(2) > div")[1]
      .querySelectorAll('input')[1]
      .click();

    expect(onChange).toHaveBeenCalledWith([columns[0]]);
  });
});
