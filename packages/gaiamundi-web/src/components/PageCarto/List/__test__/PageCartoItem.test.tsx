import { render } from '@testing-library/react';
import PageCartoItem from 'components/PageCarto/List/PageCartoItem';

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
      getByText((content) => content.endsWith(mockPageCartoData.map.name))
    ).toBeInTheDocument();
    expect(
      getByText((content) => content.endsWith(mockPageCartoData.owner.username))
    ).toBeInTheDocument();
    mockPageCartoData.tags.forEach((tag) => {
      expect(getByText(tag.name)).toBeInTheDocument();
    });
    expect(
      getByText(mockPageCartoData.html.split(/<p>|<\/p>/g)[1])
    ).toBeInTheDocument();
    const imgElement = getByRole('img');
    expect(imgElement).toHaveAttribute(
      'src',
      `${config.API_URL}${mockPageCartoData.cover.formats.thumbnail.url}`
    );
  });
});
