import { useState } from 'react';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import { NewMapForm } from './NewMapForm';

export const MapPickForm = ({
  setGeoJsonFileId,
}: {
  setGeoJsonFileId: (id: number) => void;
}) => {
  const [tabContent] = useState([
    {
      id: 1,
      title: "A partir d'une carte GeoJSON",
      content: <NewMapForm setGeoJsonFileId={setGeoJsonFileId} />,
    },
    {
      id: 2,
      title: 'Réutiliser une carte GeoJSON existante',
      content: <div className="text-center ">en cours de développement</div>,
    },
  ]);

  return (
    <div className="py-8">
      <Tab.Group>
        <Tab.List className="flex bg-blue-600 rounded-t-lg p-2">
          {tabContent.map((table) => (
            <Tab
              key={table.id}
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
              {table.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="rounded-b-lg border border-blue-700">
          {tabContent.map((tabValue) => (
            <Tab.Panel key={tabValue.id} className="p-5">
              {tabValue.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
