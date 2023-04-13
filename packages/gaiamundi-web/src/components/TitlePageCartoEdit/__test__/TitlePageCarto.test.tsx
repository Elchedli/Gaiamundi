import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { usePageCarto } from 'hooks/usePageCarto';
import { updatePageCarto } from 'services/page-carto'; // Change the import here
import { TitlePageCartoEdit } from '../TitlePageCartoEdit';

afterEach(cleanup);

jest.mock('hooks/usePageCarto');

jest.mock('services/page-carto', () => ({
  updatePageCarto: jest.fn(), // Change the mocked function here
}));

describe('TitlePageCartoEdit', () => {
  const mockPageCartoData = {
    id: 1,
    name: 'Titre initial',
  };

  beforeEach(() => {
    (usePageCarto as jest.Mock).mockReturnValue({
      data: {
        data: mockPageCartoData,
      },
    });

    (updatePageCarto as jest.Mock).mockResolvedValue({
      // Change the mocked function here
      data: {
        id: 1,
        name: 'Titre modifié',
      },
    });
  });

  it('renders the initial title', () => {
    const { getByText } = render(<TitlePageCartoEdit />);
    expect(getByText(mockPageCartoData.name)).toBeInTheDocument();
  });

  it('updates the title when edited and calls updatePageCarto with the correct parameters', async () => {
    const { getByText } = render(<TitlePageCartoEdit />);
    const titleElement = getByText(mockPageCartoData.name);

    const newTitle = 'Titre modifié';

    fireEvent.input(titleElement, { target: { textContent: newTitle } });

    fireEvent.blur(titleElement);

    await waitFor(() => {
      expect(getByText(newTitle)).toBeInTheDocument();
      expect(updatePageCarto).toHaveBeenCalledWith(mockPageCartoData.id, {
        name: newTitle,
      }); // Change the function call here
    });
  });

  it('calls handleBlur when the input element loses focus', async () => {
    const { getByText } = render(<TitlePageCartoEdit />);
    const titleElement = getByText(mockPageCartoData.name);

    fireEvent.blur(titleElement);
    await waitFor(() => {
      expect(updatePageCarto).toHaveBeenCalledWith(
        // Change the function call here
        mockPageCartoData.id,
        { name: mockPageCartoData.name }
      );
    });
  });
});
