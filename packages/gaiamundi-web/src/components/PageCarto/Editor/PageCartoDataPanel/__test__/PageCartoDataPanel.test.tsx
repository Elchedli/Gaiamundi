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
    const { getByText } = render(
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
    expect(
      getByText(`Aucun jeu de donnée n'a a été importé`)
    ).toBeInTheDocument();
  });

  it('should display the data table if data is present', async () => {
    const { getByText, queryByText } = render(
      <PageCartoPanelData
        dataFragments={mockDataFragmentsApiCollection}
        pageCartoId={286}
      />
    );
    expect(
      queryByText(`Aucun jeu de donnée n'a a été importé`)
    ).not.toBeInTheDocument();
    expect(getByText('Colonne')).toBeInTheDocument();
    expect(getByText('Source')).toBeInTheDocument();
    expect(getByText('Validité')).toBeInTheDocument();
    expect(getByText('Jeu de données')).toBeInTheDocument();

    const secondColumnRow = getByText('secondColumn').parentNode;
    expect(secondColumnRow).toHaveTextContent('firstDataset');
    expect(secondColumnRow).toHaveTextContent('source2');
    expect(secondColumnRow).toHaveTextContent('2022');

    const thirdColumnRow = getByText('thirdColumn').parentNode;
    expect(thirdColumnRow).toHaveTextContent('firstDataset');
    expect(thirdColumnRow).toHaveTextContent('source3');
    expect(thirdColumnRow).toHaveTextContent('2023');

    const fourthColumnRow = getByText('fourthColumn').parentNode;
    expect(fourthColumnRow).toHaveTextContent('firstDataset');
    expect(fourthColumnRow).toHaveTextContent('source4');
    expect(fourthColumnRow).toHaveTextContent('2024');
  });

  //could not show modal data on click() fix it with Mohamed
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
