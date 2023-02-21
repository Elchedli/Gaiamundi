import { render, screen } from '@testing-library/react';
import { AuthProvider } from 'hooks/useAuth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GeoMapList } from '../GeoMapList';

describe('GeoMapList', () => {
  it('renders the component', async () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GeoMapList />
        </AuthProvider>
      </QueryClientProvider>
    );

    expect(container).toBeInTheDocument();
    await screen.findByText(/Mes cartes/i);
  });
});
