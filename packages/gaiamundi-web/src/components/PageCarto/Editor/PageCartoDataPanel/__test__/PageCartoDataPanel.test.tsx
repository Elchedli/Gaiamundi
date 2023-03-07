import { render } from '@testing-library/react';
import { mockDataFragmentsApiCollection } from 'utils/mocks/data';
import { PageCartoPanelData } from '../PageCartoDataPanel';

describe('PageCartoPanelData', () => {
  it('should render the component', () => {
    const { getByText } = render(
      <PageCartoPanelData
        dataFragments={mockDataFragmentsApiCollection}
        pageCartoId={1}
      />
    );
    expect(getByText('Importer un jeu de données')).toBeInTheDocument();
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
        pageCartoId={286}
        isTested={true}
      />
    );
    const datasetName =
      mockDataFragmentsApiCollection.data[0].attributes.dataset.data.attributes
        .name;
    const tabColumn = mockDataFragmentsApiCollection.data[0].attributes.columns;
    const tabHeader = getAllByRole('columnheader');
    expect(tabHeader).toHaveLength(4);
    tabColumn
      .filter((column) => !column.isGeoCode)
      .forEach((column) => {
        const row = getByText(column.name).parentNode;
        expect(row).toHaveTextContent(datasetName);
        expect(row).toHaveTextContent(column.source);
        expect(row).toHaveTextContent(column.validity);
      });
    expect(container).toMatchSnapshot();
  });

  //could not show modal data on click()
  // it('modal should be called on button click', () => {
  //   const mockCallback = jest.fn();
  //   const { getByText, container } = render(
  //     <ModalProvider>
  //       <PageCartoPanelData
  //         dataFragments={mockDataFragmentsApiCollection}
  //         pageCartoId={1}
  //       />
  //     </ModalProvider>
  //   );
  //   fireEvent.click(
  //     container.querySelector('button[data-testid="button-element"]')
  //   );

  //   expect(mockCallback).toBeCalled();
  //   // const importButton = getByText('Importer un jeu de données');
  //   fireEvent.click(importButton);
  //   // expect(container).toMatchSnapshot();

  //   const importModalTitle = getByText('Importer un jeu de données');
  //   expect(importModalTitle).toBeInTheDocument();
  // });

  /*it('should open the modal on button click', () => {
    const intersectionObserverMock = () => ({
      observe: () => null,
    });
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);
    const queryClient = new QueryClient();
    const { getByText, container } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ModalProvider>
              <PageCartoPanelData
                dataFragments={mockDataFragmentsApiCollection}
                pageCartoId={1}
              />
            </ModalProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    );

    const importButton = getByText('Importer un jeu de données');
    fireEvent.click(importButton);
    expect(container).toMatchSnapshot();

    const importModalTitle = getByText('Importer un jeu de données');
    expect(importModalTitle).toBeInTheDocument();
  });*/
});
