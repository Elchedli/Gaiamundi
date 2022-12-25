import { Label } from './Inputs/Label';
import { TextInput } from './Inputs/TextInput';
import { useFormContext } from 'react-hook-form';

export const CartoForm = () => {
  const {
    register,
    getFieldState,
    formState: { errors },
  } = useFormContext(); // retrieve all hook methods

  return (
    <div>
      <Label htmlFor="Nom">Nom</Label>
      <TextInput
        id="cartoPageName"
        className="w-1/3"
        {...register('cartoPageName', {
          required: 'Veuillez saisir le nom du page carto',
        })}
      />
      {errors.cartoPageName && (
        <div className="mt-2 text-xs text-red-600">
          {getFieldState('cartoPageName')?.error?.message}
        </div>
      )}
    </div>
  );
};
