import { render, screen } from '@testing-library/react';
import App from 'App';
//Test pour le composant
describe('HomePage', () => {
  it('should render the correct title', () => {
    render(<App />);
    // Vérifie le titre de la page
    expect(screen.getByText('Gaiamundi')).toBeInTheDocument();
  });
});
