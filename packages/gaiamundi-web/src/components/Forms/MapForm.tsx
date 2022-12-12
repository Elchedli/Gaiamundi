import { Tab } from '@headlessui/react';
import { Button } from 'components/Button/Button';
import { useState } from 'react';
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const BarMap = () => {
  const [tabContent] = useState([
    {
      id: 1,
      title: "A partir d'une carte GeoJSON",
      content: (
        <>
          <div className="self-center">
            <h2>A partir d&apos;une carte GeoJSON</h2>
            <div>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-29 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click pour ajouter</span> ou
                    glisser et déposer
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Fichier ZIP (MAX. 300mb)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
          <div>
            <FormulaireJSON />
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

const FormulaireJSON = () => {
  return (
    <div className="lg:ml-12 mt-5 lg:mt-0">
      <div className="max-lg:mt-3">
        <label
          htmlFor="Nom"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Nom
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="nom"
            className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading"
          />
        </div>
      </div>
      <div className="max-lg:mt-3">
        <label
          htmlFor="Annee"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Année de validité
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="annee"
            className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading"
          />
        </div>
      </div>
      <div className="max-lg:mt-3">
        <label
          htmlFor="Source"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Source
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="source"
            className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading"
          />
        </div>
      </div>
      <div className="max-lg:mt-3">
        <label
          htmlFor="License"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          License
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="license"
            className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading"
          />
        </div>
      </div>
    </div>
  );
};

export const MapForm: React.FC = () => {
  return (
    <>
      <div>
        <label
          htmlFor="Nom"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Nom
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="nom"
            className="block w-max px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading"
          />
        </div>
      </div>
      <form action="">
        <div className=" mr-10">
          <div>
            <BarMap />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit">Valider</Button>
        </div>
      </form>
    </>
  );
};

export default MapForm;
