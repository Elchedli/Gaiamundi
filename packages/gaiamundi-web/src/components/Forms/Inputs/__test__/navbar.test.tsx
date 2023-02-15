import { render } from '@testing-library/react';
import Navbar from 'components/Layout/Navbar';
import { useAuth } from 'hooks/useAuth';
import { MemoryRouter, useLocation } from 'react-router-dom';

jest.mock('hooks/useAuth');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render authentication menu when not authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/' });
    const { getByText } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(getByText('Se connecter')).toBeInTheDocument();
    expect(getByText('Créer un compte')).toBeInTheDocument();
    expect(getByText('Tableau de bord')).not.toBeInTheDocument();
    expect(getByText('Compte')).not.toBeInTheDocument();
  });
});

//   it('should render logged-in menu when authenticated and not on home page', () => {
//     (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
//     (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard' });
//     render(
//       <MemoryRouter>
//         <Navbar />
//       </MemoryRouter>
//     );
//     expect(screen.queryByText('Se connecter')).not.toBeInTheDocument();
//     expect(screen.queryByText('Créer un compte')).not.toBeInTheDocument();
//   });
// });
