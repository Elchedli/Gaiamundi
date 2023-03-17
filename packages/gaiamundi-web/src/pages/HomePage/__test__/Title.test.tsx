import { render, screen } from '@testing-library/react';
import { useQuery } from 'react-query';
import { HomePage } from '../HomePage';

//Vérifie si les  modules sont correctement installés
console.log(render);
console.log(screen);
console.log(useQuery);
console.log(HomePage);
//Simulation du comportement de la fonction useQuery

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));

//Simulation du comportement  du composant HomePage
jest.mock('../HomePage.tsx', () => ({
  __esModule: true,
  default: function MockedHomePage() {
    return (
      <html>
        <head>
          <title>Gaiamundi</title>
        </head>
        <body></body>
      </html>
    );
  },
}));

//Test pour le composant HomePage
describe('HomePage', () => {
  it('should render the correct title', () => {
    (useQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: false,
      isError: false,
    });
    render(<HomePage />);
    // Vérifie le titre de la page
    expect(screen.getByText('Gaiamundi')).toBeInTheDocument();
  });
});
