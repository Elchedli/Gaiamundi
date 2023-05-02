import { PlusIcon } from '@heroicons/react/24/solid';
import { Button } from 'components/Button/Button';
import { useModal } from 'hooks/useModal';
import { usePageCarto } from 'hooks/usePageCarto';
import { FC } from 'react';
import { ChartPicker } from './ChartPicker';

export const PageCartoChartPanel: FC = () => {
  const { showModal, hideModal } = useModal();
  const { pageCartoId } = usePageCarto();
  return (
    <div className="flex justify-center h-full">
      <Button
        icon={PlusIcon}
        data-testid="create-chart"
        onClick={() =>
          showModal({
            title: 'nouveau graphique',
            Component: ChartPicker,
            props: { pageCartoId, onSubmit: hideModal },
          })
        }
        className="m-auto"
      >
        Nouveau graphique
      </Button>
    </div>
  );
};
