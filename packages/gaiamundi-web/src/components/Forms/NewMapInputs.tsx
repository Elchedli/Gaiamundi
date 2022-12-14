import { TextInput } from './TextInput';

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
          <TextInput className="max-lg:w-full" id="nom" />
        </div>
      </div>
      <div className="max-lg:mt-3">
        <label
          htmlFor="Annee"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Année de validitée
        </label>
        <div className="mt-1 rounded-md">
          <TextInput id="annee" className="max-lg:w-full" />
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
          <TextInput id="source" className="max-lg:w-full" />
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
          <TextInput id="license" className="max-lg:w-full" />
        </div>
      </div>
    </div>
  );
};

export default NewMapInputs;
