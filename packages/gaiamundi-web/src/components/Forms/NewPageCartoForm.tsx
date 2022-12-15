import { Button } from 'components/Button/Button';
import { Label } from './Inputs/Label';
import { TextInput } from './Inputs/TextInput';
import NewPageCartoFormTab from './NewPageCartoFormTab';
const NewPageCartoForm: React.FC = () => {
  return (
    <>
      <div>
        <Label
          htmlFor="Nom"
          className="block text-sm font-medium leading-5 text-gray-700"
        />
        Nom
        <div className="mt-1 rounded-md">
          <TextInput
            id="nom"
            className="block w-max px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading"
          />
        </div>
      </div>
      <form action="">
        <div className=" mr-10">
          <NewPageCartoFormTab />
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="submit">Valider</Button>
        </div>
      </form>
    </>
  );
};

export default NewPageCartoForm;
