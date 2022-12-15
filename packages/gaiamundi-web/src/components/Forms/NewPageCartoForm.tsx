import { useState } from 'react';
import { Tab } from '@headlessui/react';
import classNames from 'classnames';
import DropZone from './Inputs/DropZone';
import { Label } from './Inputs/Label';
import { TextInput } from './Inputs/TextInput';

const FormulaireInput = () => {
  return (
    <div className="lg:ml-12 mt-5 lg:mt-0">
      <div className="max-lg:mt-3">
        <Label
          htmlFor="Nom"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Nom
        </Label>
        <div className="mt-1 rounded-md">
          <TextInput className="max-lg:w-full" id="nom" />
        </div>
      </div>
      <div className="max-lg:mt-3">
        <Label
          htmlFor="Annee"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Année de validitée
        </Label>
        <div className="mt-1 rounded-md">
          <TextInput id="annee" className="max-lg:w-full" />
        </div>
      </div>
      <div className="max-lg:mt-3">
        <Label
          htmlFor="Source"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Source
        </Label>
        <div className="mt-1 rounded-md">
          <TextInput id="source" className="max-lg:w-full" />
        </div>
      </div>
      <div className="max-lg:mt-3">
        <Label
          htmlFor="License"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          License
        </Label>
        <div className="mt-1 rounded-md">
          <TextInput id="license" className="max-lg:w-full" />
        </div>
      </div>
    </div>
  );
};

const NewPageCartoForm = () => {
  const [tabContent] = useState([
    {
      id: 1,
      title: "A partir d'une carte GeoJSON",
      content: (
        <>
          <DropZone />
          <FormulaireInput />
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

export default NewPageCartoForm;
