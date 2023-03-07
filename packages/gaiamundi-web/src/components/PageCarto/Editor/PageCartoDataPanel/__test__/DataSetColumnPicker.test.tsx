import { fireEvent, render, screen } from '@testing-library/react';
import { mockDataFragmentsApiCollection } from 'utils/mocks/data';
import DatasetColumnPicker from '../DatasetColumnPicker';

describe('DatasetColumnPicker', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  it('renders with correct data', () => {
    const onChangeMock = jest.fn();
    render(
      <DatasetColumnPicker
        data={mockDataFragmentsApiCollection.data[0].attributes.columns}
        onChange={onChangeMock}
      />
    );
    const column1 = screen.getByText('firstColumn');
    const column2 = screen.getByText('secondColumn');
    expect(column1).toBeInTheDocument();
    expect(column2).toBeInTheDocument();
  });

  it('selects and deselects columns', () => {
    const onChangeMock = jest.fn();
    const { container } = render(
      <DatasetColumnPicker
        data={mockDataFragmentsApiCollection.data[0].attributes.columns}
        onChange={onChangeMock}
      />
    );
    const table = container.querySelectorAll(
      "div[role='grid']:nth-child(2) > div"
    );
    const column1 = table[1];
    const column2 = table[2];
    column1.querySelector('input')?.click();
    expect(column1.getAttribute('aria-selected')).toContain('true');
    expect(column2.getAttribute('aria-selected')).toContain('false');

    column2.querySelector('input')?.click();
    expect(column2.getAttribute('aria-selected')).toContain('true');
  });

  it('filters rows based on search', () => {
    const onChangeMock = jest.fn();
    const { container } = render(
      <DatasetColumnPicker
        data={mockDataFragmentsApiCollection.data[0].attributes.columns}
        onChange={onChangeMock}
      />
    );
    const input = container.querySelector('input:nth-child(2)');
    const column1 = screen.getByText('firstColumn');
    const column2 = screen.getByText('secondColumn');
    fireEvent.change(input as HTMLElement, {
      target: { value: 'firstColumn' },
    });
    expect(column1).toBeInTheDocument();
    expect(column2).not.toBeInTheDocument();
  });

  it('selects geoCode column', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <DatasetColumnPicker
        data={mockDataFragmentsApiCollection.data[0].attributes.columns}
        onChange={onChange}
      />
    );
    container
      .querySelectorAll("div[role='grid']:nth-child(2) > div")[1]
      .querySelector('input')
      ?.click();
    container
      .querySelectorAll("div[role='grid']:nth-child(2) > div")[1]
      .querySelectorAll('input')[1]
      .click();

    expect(onChange).toHaveBeenCalledWith([
      {
        name: 'firstColumn',
        source: 'source1',
        validity: '2021',
        isGeoCode: true,
      },
    ]);
  });
});
