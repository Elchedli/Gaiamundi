import { fireEvent, render } from '@testing-library/react';
import { mockPageCartoData } from 'utils/mocks/data';
import { PageCartoPanels } from '../PageCartoPanels';

describe('PageCartoPanels', () => {
  it('renders the tabs and their content', async () => {
    const { getAllByRole, getByTestId } = render(
      <PageCartoPanels pageCarto={mockPageCartoData} />
    );
    const tabs = getAllByRole('tab');
    expect(tabs).toHaveLength(3);

    fireEvent.click(tabs[1]);
    expect(getByTestId('import-dataset')).toBeDefined();
  });
});
