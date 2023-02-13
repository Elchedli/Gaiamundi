import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { GeoMapList } from 'components/MapGeoCreate/GeoMapList';
import { FC } from 'react';
import { MapForm } from './MapForm';

export const MapPickForm: FC = () => {
  const tabs = [
    {
      id: 1,
      title: "A partir d'une carte GeoJSON",
      content: <MapForm />,
    },
    {
      id: 2,
      title: 'Réutiliser une carte GeoJSON existante',
      content: <GeoMapList />,
    },
  ];

  return (
    <div className="py-8">
      <Tab.Group>
        <Tab.List className="flex bg-blue-600 rounded-t-lg p-2">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                classNames(
                  'rounded-t-lg p-4 text-sm font-medium leading-5 text-blue-700',
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
        <Tab.Panels className="rounded-b-lg border border-blue-700">
          {tabs.map((tab) => (
            <Tab.Panel key={tab.id} className="p-5">
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
