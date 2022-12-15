import { Button } from 'components/Button/Button';
import { Label } from 'components/Forms/Inputs/Label';
import { TextInput } from 'components/Forms/Inputs/TextInput';
import NewPageCartoFormTab from 'components/Forms/NewPageCartoForm';

export const NewPageCartoPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex justify-center">
        <h2 className="mt-10 text-3xl font-extrabold text-blue-700">
          Nouvelle PageCarto
        </h2>
      </div>
      <div className="mx-4 lg:mx-8 mt-8 flex justify-center">
        <div className="w-fit lg:w-3/5 px-4 py-8 mt-8 bg-white rounded-lg shadow-lg sm:px-10">
          <div>
            <Label
              htmlFor="Nom"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Nom
            </Label>
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
        </div>
      </div>
    </div>
  );
};
