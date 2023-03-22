import { fireEvent, render, waitFor } from '@testing-library/react';
import { useAuth } from 'hooks/useAuth';
import { useMutation, useQuery } from 'react-query';
import { mockGeoMapApiCollection } from 'utils/mocks/data';
import { NewPageCartoForm } from '../NewPageCartoForm';

jest.mock('hooks/useAuth');
jest.mock('react-router-dom');
jest.mock('react-query');

describe('NewPageCarto form tests', () => {
  beforeEach(() => {
    // Mock useAuth hook to return a fake user object
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: { id: 1 },
    });

    (useMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: false, isError: false },
    ]);

    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { ...mockGeoMapApiCollection },
      isError: false,
      error: null,
      isLoading: false,
    }));
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the new pageCarto form', async () => {
    const { getByTestId } = render(<NewPageCartoForm />);
    await waitFor(() => {
      expect(getByTestId('new-page-carto-from')).toBeInTheDocument();
    });
  });
  it('should select the map for the new carto page from an existing map tab', async () => {
    const { getAllByRole, getByTestId } = render(<NewPageCartoForm />);

    const cartoPageName = getByTestId('carto-page-name');
    const tabs = getAllByRole('tab');
    fireEvent.change(cartoPageName, { target: { value: 'mock cartoPage' } });
    expect(cartoPageName).toHaveValue('mock cartoPage');
    expect(tabs).toHaveLength(2);
    fireEvent.click(tabs[1]);
    const maps = getAllByRole('card');
    expect(maps[0]).toBeInTheDocument();
    fireEvent.click(maps[0]);
    expect(maps[0]).toHaveClass(
      'flex-col bg-blue-300 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700'
    );
  });
});
