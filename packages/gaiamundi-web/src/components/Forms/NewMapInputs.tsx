const NewMapInputs = () => {
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

export default NewMapInputs;
