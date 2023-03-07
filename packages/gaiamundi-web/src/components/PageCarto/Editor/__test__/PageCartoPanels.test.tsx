import { fireEvent, render } from '@testing-library/react';
import { mockPageCartoData } from 'utils/mocks/data';
import { PageCartoPanels } from '../PageCartoPanels';

describe('PageCartoPanels', () => {
  it('renders the tabs and their content', async () => {
    const { getAllByRole, getByText, container } = render(
      <PageCartoPanels pageCarto={mockPageCartoData} />
    );
    const tabs = getAllByRole('tab');

    expect(tabs[0]).toBeInTheDocument();
    expect(tabs[1]).toBeInTheDocument();
    expect(tabs[2]).toBeInTheDocument();

    fireEvent.click(tabs[1]);

    expect(getByText('secondColumn')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
