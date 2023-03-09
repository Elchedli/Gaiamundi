import { render } from '@testing-library/react';
import { mockDataFragmentsApiCollection } from 'utils/mocks/data';
import { PageCartoPanelData } from '../PageCartoDataPanel';

describe('PageCartoPanelData', () => {
  it('should render the component', () => {
    const { getByTestId } = render(
      <PageCartoPanelData
        dataFragments={mockDataFragmentsApiCollection}
        pageCartoId={1}
      />
    );
    expect(getByTestId('import-dataset')).toBeInTheDocument();
  });

  it('should display an info alert if no data is present', () => {
    const { container, getByRole } = render(
      <PageCartoPanelData
        dataFragments={{
          data: [],
          meta: {
            pagination: {
              total: 0,
            },
          },
        }}
        pageCartoId={1}
      />
    );
    expect(getByRole('alert')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should display the data table if data is present', async () => {
    const { container, getByText, getAllByRole } = render(
      <PageCartoPanelData
        dataFragments={mockDataFragmentsApiCollection}
        pageCartoId={1}
      />
    );
    const datasetName =
      mockDataFragmentsApiCollection.data[0].attributes.dataset.data.attributes
        .name;
    const columns = mockDataFragmentsApiCollection.data[0].attributes.columns;
    const columnHeaders = getAllByRole('columnheader');
    expect(columnHeaders).toHaveLength(4);
    columns
      .filter((column) => !column.isGeoCode)
      .forEach((column) => {
        const row = getByText(column.name).parentNode;
        expect(row).toHaveTextContent(datasetName);
        expect(row).toHaveTextContent(column.source);
        expect(row).toHaveTextContent(column.validity);
      });
    expect(container).toMatchSnapshot();
  });
});
