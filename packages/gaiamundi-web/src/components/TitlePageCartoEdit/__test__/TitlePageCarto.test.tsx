import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { usePageCarto } from 'hooks/usePageCarto';
import { updatePageCarto } from 'services/page-carto';
import { TitlePageCartoEdit } from '../TitlePageCartoEdit';

afterEach(cleanup);

jest.mock('hooks/usePageCarto');

jest.mock('services/page-carto', () => ({
  updatePageCarto: jest.fn(),
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
      data: {
        id: 1,
        name: 'Titre modifié',
      },
    });
  });

  it('renders the initial title', () => {
    const { getByTestId } = render(<TitlePageCartoEdit />);
    expect(getByTestId('editable-title').innerText).toEqual(
      mockPageCartoData.name
    );
  });
  it('updates the title when edited and calls updatePageCarto with the correct parameters', async () => {
    const { getByTestId } = render(<TitlePageCartoEdit />);
    const inputElement = getByTestId('editable-title');

    const newTitle = 'Titre modifié';

    fireEvent.input(inputElement, { target: { innerText: newTitle } });

    fireEvent.blur(inputElement);

    await waitFor(() => {
      expect(getByTestId('editable-title').innerText).toEqual(newTitle);
      expect(updatePageCarto).toHaveBeenCalledWith(mockPageCartoData.id, {
        name: newTitle,
      });
    });
  });

  it('calls handleBlur when the input element loses focus', async () => {
    const { getByTestId } = render(<TitlePageCartoEdit />);
    const inputElement = getByTestId('editable-title');

    const differentTitle = 'Titre différent';

    fireEvent.input(inputElement, {
      target: { innerText: differentTitle },
    });

    fireEvent.blur(inputElement);
    await waitFor(() => {
      expect(updatePageCarto).toHaveBeenCalledWith(mockPageCartoData.id, {
        name: differentTitle,
      });
    });
  });
});
