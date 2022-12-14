import { useState } from 'react';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import NewMapInputs from './NewMapInputs';
import DropZoneMap from './DropzoneMap';

const NewMapFormTab = () => {
  const [tabContent] = useState([
    {
      id: 1,
      title: "A partir d'une carte GeoJSON",
      content: (
        <>
          <DropZoneMap />
          <div>
            <NewMapInputs />
          </div>
        </>
      ),
    },
    {
      id: 2,
      title: 'Réutiliser une carte GeoJSON existante',
      content: <div className="text-center ">en cours de développement</div>,
    },
  ]);

  return (
    <div className=" px-2 py-8 ">
      <Tab.Group>
        <Tab.List className="w-fit flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {tabContent.map((table) => (
            <Tab
              key={table.id}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
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
        <Tab.Panels className="mt-2">
          {tabContent.map((tabValue) => (
            <Tab.Panel
              key={tabValue.id}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <div key={tabValue.id} className="grid lg:grid-cols-2">
                {tabValue.content}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default NewMapFormTab;
