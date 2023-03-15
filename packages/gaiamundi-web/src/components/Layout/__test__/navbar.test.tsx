import { fireEvent, render } from '@testing-library/react';
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
    const { getByTestId } = render(
      <Router>
        <Navbar />
      </Router>
    );

    const loginButtons = getByTestId('login-buttons').childNodes;
    expect(loginButtons[0]).toHaveAttribute('href', '/login');
    expect(loginButtons[1]).toHaveAttribute('href', '/signup');
  });

  it('should render logged-in menu when authenticated and not on home page', () => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: mockUser,
    }));

    const { getByTestId } = render(
      <Router>
        <Navbar />
      </Router>
    );

    //should check that the navigations buttons on the navbar are equal to 4 in homepage
    expect(getByTestId('navigations').childNodes).toHaveLength(4);
    //should click new page carto button to change navigation buttons.
    fireEvent.click(getByTestId('newPageCarto-button'));
    //should check that the navigations buttons on the navbar are equal to 2 in newpagecarto page
    expect(getByTestId('navigations').childNodes).toHaveLength(2);
  });
});
