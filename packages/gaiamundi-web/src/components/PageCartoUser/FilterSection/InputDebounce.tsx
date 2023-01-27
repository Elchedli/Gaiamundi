import { TextInput, TextInputProps } from 'components/Forms/Inputs/TextInput';
import { debounce } from 'utils/debounce';

interface ISearchInputDebounce extends TextInputProps {
  rebound: (searchTerm: string) => void;
}

export const SearchInputDebounce = ({
  rebound,
  ...otherProps
}: ISearchInputDebounce) => {
  const debounceSearch = debounce((nameInput: string) => {
    rebound(nameInput);
  });

  return (
    <TextInput
      {...otherProps}
      onChange={(e) => debounceSearch(e.target.value)}
    />
  );
};
