import { fireEvent, render, screen } from '@testing-library/react';
import Navbar from 'components/Layout/Navbar';
import { useAuth } from 'hooks/useAuth';
import { MemoryRouter as Router } from 'react-router-dom';
import { mockUser } from 'utils/mocks/data';

jest.mock('hooks/useAuth');

describe('Navbar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render authentication menu when not authenticated', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: false,
    }));
    const { container } = render(
      <Router>
        <Navbar />
      </Router>
    );

    const loginButtons = screen.getByTestId('loginButtons').childNodes;
    expect(loginButtons[0]).toHaveAttribute('href', '/login');
    expect(loginButtons[1]).toHaveAttribute('href', '/signup');
    expect(container).toMatchSnapshot();
  });

  it('should render logged-in menu when authenticated and not on home page', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: mockUser,
    }));

    const { container } = render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByTestId('navigations').childNodes).toHaveLength(4);
    fireEvent.click(screen.getAllByTestId('button-element')[0]);
    expect(screen.getByTestId('navigations').childNodes).toHaveLength(2);
    expect(container).toMatchSnapshot();
  });
});
