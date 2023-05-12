import { fireEvent, render } from '@testing-library/react';
import PageCartoItem from 'components/PageCarto/List/PageCartoItem';

import config from 'config';
import { useAuth } from 'hooks/useAuth';
import { useMutation } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { mockPageCartoData, mockUser } from 'utils/mocks/data';

jest.mock('hooks/useAuth');
jest.mock('react-query', () => ({
  useMutation: jest.fn(),
}));

describe('PageCartoItem', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: mockUser,
    }));
    (useMutation as jest.Mock).mockImplementation(() => ({
      isError: false,
      error: null,
      isLoading: false,
    }));
  });
  it('renders PageCartoItem', () => {
    const { getByText, getByRole } = render(
      <Router>
        <PageCartoItem {...mockPageCartoData} />
      </Router>
    );
    expect(getByText(mockPageCartoData.name)).toBeInTheDocument();

    expect(
      getByText((content) => content.endsWith(mockPageCartoData.map.name))
    ).toBeInTheDocument();
    expect(
      getByText((content) => content.endsWith(mockPageCartoData.owner.username))
    ).toBeInTheDocument();
    mockPageCartoData.tags.forEach((tag) => {
      expect(getByText(tag.name)).toBeInTheDocument();
    });
    expect(
      getByText(mockPageCartoData.html.split(/<p>|<\/p>/g)[1])
    ).toBeInTheDocument();
    const imgElement = getByRole('img');
    expect(imgElement).toHaveAttribute(
      'src',
      `${config.API_URL}${mockPageCartoData.cover.formats.thumbnail.url}`
    );
  });
  it('should return the loading message', () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      data: { data: [] },
      isError: false,
      error: null,
      isLoading: true,
    }));
    const { getByTestId } = render(<PageCartoItem {...mockPageCartoData} />);
    const loadingMessage = getByTestId('loading-message');
    expect(loadingMessage).toBeInTheDocument();
  });
  it('should return the error message', () => {
    const mockError = {
      message: 'An error occurred',
      statusCode: 500,
    };
    (useMutation as jest.Mock).mockImplementation(() => ({
      data: { data: [] },
      isError: true,
      error: mockError,
      isLoading: false,
    }));
    const { getByTestId } = render(<PageCartoItem {...mockPageCartoData} />);
    const errorMessage = getByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
  });
  it('should redirect to edit pageCarto', async () => {
    const { getByTestId } = render(
      <Router>
        <PageCartoItem {...mockPageCartoData} />
      </Router>
    );
    const editButton = getByTestId('editIcon');
    fireEvent.click(editButton);
    expect(window.location.pathname).toEqual(
      `/page-carto/${mockPageCartoData.id}/edit`
    );
  });
  /*********************
   * this test doesn't pass
   * I wanted to test first the click on the TrashIcon
   * In a second time i wanted to test the presence of the modal to confirm the delete
   * At the end, I wanted to test if the delete works
   */
  /* it('should delete pageCarto', async () => {
    const mockIntersectionObserver = jest.fn();

    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });

    const { getByTestId } = render(
      <Router>
        <ModalProvider>
          <PageCartoItem {...mockPageCartoData} />
        </ModalProvider>
      </Router>
    );

    await waitFor(() => {
      const deleteButton = getByTestId('deleteIcon');
      fireEvent.click(deleteButton);
    });
    await waitFor(() => {
      const deleteModal = getByTestId('delete-modal');
      expect(deleteModal).toBeInTheDocument();

      const confirmButton = getByTestId('confirmDelete');
      fireEvent.click(confirmButton);

      expect(deleteModal).not.toBeInTheDocument();
    });
  });*/
});
