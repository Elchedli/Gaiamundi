import { mockDataFragmentsApiCollection } from 'utils/mocks/data';
import { PageCartoPanelData } from './PageCartoDataPanel';

export const PageCartoTestDataPanel = () => {
  return (
    <PageCartoPanelData
      dataFragments={mockDataFragmentsApiCollection}
      pageCartoId={286}
    />
  );
};
