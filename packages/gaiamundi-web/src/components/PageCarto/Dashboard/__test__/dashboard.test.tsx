import { render } from '@testing-library/react';
import { useAuth } from 'hooks/useAuth';
import { User } from 'interfaces/user';
import { useQuery } from 'react-query';
import { Dashboard } from '../Dashboard';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('hooks/useAuth');

const user: User = {
  id: 1,
  confirmed: true,
  blocked: false,
  username: 'testuser',
  email: 'testuser@test.com',
  provider: 'local',
  password: 'testpass',
  created_at: '2022-02-07T00:00:00.000Z',
  updated_at: '2022-02-07T00:00:00.000Z',
};

describe('Dashboard', () => {
  it('check if query works correctly', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: user,
    }));

    (useQuery as jest.Mock).mockReturnValueOnce({
      data: {
        data: [],
      },
    });
    const { getByText, container } = render(<Dashboard />);
    expect(getByText('Aucun tag na été trouvé!.')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
