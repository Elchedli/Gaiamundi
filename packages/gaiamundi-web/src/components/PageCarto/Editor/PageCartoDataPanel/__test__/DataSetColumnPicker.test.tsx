import { fireEvent, render, screen } from '@testing-library/react';
import { mockDataFragmentsApiCollection } from 'utils/mocks/data';
import DatasetColumnPicker from '../DatasetColumnPicker';

describe('DatasetColumnPicker', () => {
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
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
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

    // container
    //   .querySelector('.pointer-events-none')
    //   ?.parentNode?.querySelector('input')
    //   ?.click();
    const input = container.querySelector('input:nth-child(2)');
    const column1 = screen.getByText('firstColumn');
    const column2 = screen.getByText('secondColumn');
    fireEvent.change(input, { target: { value: 'firstColumn' } });
    expect(column1).toBeInTheDocument();
    expect(column2).not.toBeInTheDocument();
  });

  it('selects geoCode column', () => {
    const onChangeMock = jest.fn();
    render(
      <DatasetColumnPicker
        data={mockDataFragmentsApiCollection.data[0].attributes.columns}
        onChange={onChangeMock}
      />
    );
    const column1 = screen.getByText('column1');
    const geoCodeRadio = screen.getByText('GéoCode');

    fireEvent.click(column1);
    fireEvent.click(geoCodeRadio);
    expect(onChangeMock).toHaveBeenCalledWith([
      {
        name: 'column1',
        source: 'source1',
        validity: 'validity1',
        isGeoCode: true,
      },
    ]);
  });
});
