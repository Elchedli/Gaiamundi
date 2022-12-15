import { Button } from 'components/Button/Button';
import { Label } from './Inputs/Label';
import { TextInput } from './Inputs/TextInput';
import { MapPickForm } from './MapPickForm';

export const NewPageCartoForm: React.FC = () => {
  return (
    <div className="flex flex-col mt-5 p-4 rounded-lg shadow-xl">
      <div>
        <Label htmlFor="Nom">Nom</Label>
        <TextInput id="nom" className="w-1/3" />
      </div>
      <div className="mr-10">
        <MapPickForm />
      </div>
      <div className="mr-10 flex justify-end">
        <Button type="submit" size="lg">
          Valider
        </Button>
      </div>
    </div>
  );
};
