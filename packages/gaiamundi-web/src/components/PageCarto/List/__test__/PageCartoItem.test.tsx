import { render } from '@testing-library/react';
import PageCartoItem from 'components/PageCarto/List/PageCartoItem';
import { Badge } from 'components/Tags/Badge';
import config from 'config';
import { MemoryRouter as Router } from 'react-router-dom';
import { mockPageCartoData } from 'utils/mocks/data';
describe('PageCartoItem', () => {
  it('renders PageCartoItem', () => {
    const { getByText, getByRole } = render(
      <Router>
        <PageCartoItem {...mockPageCartoData} />
      </Router>
    );
    expect(getByText(mockPageCartoData.name)).toBeInTheDocument();

    expect(
      getByText('Carte : ' + mockPageCartoData.map.name)
    ).toBeInTheDocument();
    expect(
      getByText('Créer par : ' + mockPageCartoData.owner.username)
    ).toBeInTheDocument();
    mockPageCartoData.tags.forEach((tag) => {
      expect(getByText(tag.name)).toBeInTheDocument();
    });
    expect(getByText('Test HTML')).toBeInTheDocument();
    const imgElement = getByRole('img');
    expect(imgElement).toHaveAttribute(
      'src',
      `${config.API_URL}${mockPageCartoData.cover.formats.thumbnail.url}`
    );
  });
});

test('if we dont have herf, we dont have tage link', () => {
  const { container } = render(<Badge />);
  const herf = container.getAttribute('herf');
  const link = container.querySelector('a');
  expect(herf).toBe(null);
  expect(link).not.toBeInTheDocument();
});
