import { Label } from './Inputs/Label';
import { TextInput } from './Inputs/TextInput';
const NewMapForm = () => {
  return (
    <div className="lg:ml-12 mt-5 lg:mt-0">
      <div className="max-lg:mt-3">
        <Label
          htmlFor="Nom"
          className="block text-sm font-medium leading-5 text-gray-700"
        />
        Nom
        <div className="mt-1 rounded-md">
          <TextInput className="max-lg:w-full" id="nom" />
        </div>
      </div>
      <div className="max-lg:mt-3">
        <Label
          htmlFor="Annee"
          className="block text-sm font-medium leading-5 text-gray-700"
        />
        Année de validitée
        <div className="mt-1 rounded-md">
          <TextInput id="annee" className="max-lg:w-full" />
        </div>
      </div>
      <div className="max-lg:mt-3">
        <Label
          htmlFor="Source"
          className="block text-sm font-medium leading-5 text-gray-700"
        />
        Source
        <div className="mt-1 rounded-md">
          <TextInput id="source" className="max-lg:w-full" />
        </div>
      </div>
      <div className="max-lg:mt-3">
        <Label
          htmlFor="License"
          className="block text-sm font-medium leading-5 text-gray-700"
        />
        License
        <div className="mt-1 rounded-md">
          <TextInput id="license" className="max-lg:w-full" />
        </div>
      </div>
    </div>
  );
};

export default NewMapForm;
