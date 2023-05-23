import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { PageCartoDataPanel } from './PageCartoDataPanel/PageCartoDataPanel';
import TextEditor from './PageCartoHyperTextPanel/TextEditor';
import { PageCartoIndicatorPanel } from './PageCartoIndicatorPanel/PageCartoIndicatorPanel';
import { PageCartoMapPanel } from './PageCartoMapPanel/PageCartoMapPanel';

export const PageCartoPanels: React.FC = () => {
  const tabs = [
    {
      id: 1,
      title: 'Hypertexte',
      content: <TextEditor />,
    },
    {
      id: 2,
      title: 'Données',
      content: <PageCartoDataPanel />,
    },
    {
      id: 3,
      title: 'Indicateurs',
      content: <PageCartoIndicatorPanel />,
    },
    {
      id: 4,
      title: 'Carte',
      content: <PageCartoMapPanel />,
    },
  ];

  return (
    <div className="h-full w-full flex flex-col" data-testid="pagecarto-panels">
      <div className="flex flex-col h-full">
        <Tab.Group>
          <Tab.List className="flex bg-blue-600 rounded-t-lg p-2 pb-0">
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
          <Tab.Panels className="box-border px-2 rounded-b-lg border border-blue-700 overflow-y-auto h-full">
            {tabs.map((tab) => (
              <Tab.Panel key={tab.id}>{tab.content}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
