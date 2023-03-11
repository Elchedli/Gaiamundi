import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { FC } from 'react';
import { PageCartoPanelData } from './PageCartoDataPanel/PageCartoDataPanel';
import { PageCartoIndicatorPanel } from './PageCartoIndicatorPanel/PageCartoIndicatorPanel';

export const PageCartoPanels: FC = () => {
  const tabs = [
    {
      id: 1,
      title: 'Hypertexte',
      content: <div className="text-center">en cours de développement</div>,
    },
    {
      id: 2,
      title: 'Données',
      content: <PageCartoPanelData />,
    },
    {
      id: 3,
      title: 'Indicateurs',
      content: <PageCartoIndicatorPanel />,
    },
  ];

  return (
    <div className="h-full w-full p-2" data-testid="pagecarto-panels">
      <Tab.Group>
        <Tab.List className="flex bg-blue-600 rounded-t-lg p-1 pb-0">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                classNames(
                  'rounded-t-lg p-2 text-sm font-medium leading-5 text-blue-700',
                  'ring-blue ring-opacity-60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {tab.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="h-full rounded-b-lg border border-blue-700">
          {tabs.map((tab) => (
            <Tab.Panel
              key={tab.id}
              className="px-2 pb-5 overflow-y-scroll"
              style={{ maxHeight: 'calc(100vh - 64px * 2)' }}
            >
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
