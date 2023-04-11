import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { usePageCarto } from 'hooks/usePageCarto';
import { updatedTitle } from 'services/page-carto';
import { TitlePageCartoEdit } from '../TitlePageCartoEdit';

afterEach(cleanup);

jest.mock('hooks/usePageCarto');

jest.mock('services/page-carto', () => ({
  updatedTitle: jest.fn(),
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

    (updatedTitle as jest.Mock).mockResolvedValue({
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

  it('updates the title when edited and calls updatedTitle with the correct parameters', async () => {
    const { getByText } = render(<TitlePageCartoEdit />);
    const titleElement = getByText(mockPageCartoData.name);

    const newTitle = 'Titre modifié';

    fireEvent.input(titleElement, { target: { textContent: newTitle } });

    fireEvent.blur(titleElement);

    await waitFor(() => {
      expect(getByText(newTitle)).toBeInTheDocument();
      expect(updatedTitle).toHaveBeenCalledWith(mockPageCartoData.id, newTitle);
    });
  });

  it('calls handleBlur when the input element loses focus', async () => {
    const { getByText } = render(<TitlePageCartoEdit />);
    const titleElement = getByText(mockPageCartoData.name);

    fireEvent.blur(titleElement);
    await waitFor(() => {
      expect(updatedTitle).toHaveBeenCalledWith(
        mockPageCartoData.id,
        mockPageCartoData.name
      );
    });
  });
});
