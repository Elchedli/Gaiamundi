import { render } from '@testing-library/react';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mockUser } from 'utils/mocks/data';
import { Dashboard } from '../Dashboard';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('hooks/useAuth');

describe('Dashboard', () => {
  it('check if query works correctly', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: mockUser,
    }));
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: {
        data: [],
      },
    });

    const { getByTestId, container } = render(<Dashboard />);

    expect(getByTestId('error-message')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
