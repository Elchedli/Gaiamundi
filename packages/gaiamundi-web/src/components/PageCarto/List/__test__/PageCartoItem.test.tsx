import { render } from '@testing-library/react';
import PageCartoItem from 'components/PageCarto/List/PageCartoItem';
import config from 'config';
//import exp from 'constants';
//import Enzyme, { shallow } from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';
import { MemoryRouter as Router } from 'react-router-dom';
import { mockPageCartoData } from 'utils/mocks/data';
//Enzyme.configure({ adapter: new Adapter() });
describe('PageCartoItem', () => {
  it('renders PageCartoItem', () => {
    const { getByText, getByRole } = render(
      <Router>
        <PageCartoItem {...mockPageCartoData} />
      </Router>
    );
    //const tags = aq
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

    //const wrapper = shallow(<Badge />);
    //const link = wrapper.find('herf');
    //expect(link.exists('a'));
  });
});
