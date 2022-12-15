import DropZone from './Inputs/DropZone';
import { Label } from './Inputs/Label';
import { TextInput } from './Inputs/TextInput';

export const NewMapForm = () => {
  return (
    <div className="grid lg:grid-cols-2">
      <DropZone />
      <div className="px-5">
        <div>
          <Label htmlFor="Nom">Nom</Label>
          <TextInput id="nom" className="w-full" />
        </div>
        <div>
          <Label htmlFor="Annee">Année de validité</Label>
          <TextInput id="annee" className="w-full" />
        </div>
        <div>
          <Label htmlFor="Source">Source</Label>
          <TextInput id="source" className="w-full" />
        </div>
        <div>
          <Label htmlFor="License">License</Label>
          <TextInput id="license" className="w-full" />
        </div>
      </div>
    </div>
  );
};
