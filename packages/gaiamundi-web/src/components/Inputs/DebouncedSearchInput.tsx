import { TextInput, TextInputProps } from 'components/Inputs/TextInput';
import { FC } from 'react';
import { debounce } from 'utils/debounce';

interface DebouncedSearchInputProps extends TextInputProps {
  onDebouncedChange: (searchTerm: string) => void;
}

export const SearchInputDebounce: FC<DebouncedSearchInputProps> = ({
  onDebouncedChange: rebound,
  ...otherProps
}) => {
  const debounceSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    rebound(e.target.value);
  };

  return (
    <TextInput
      data-testid="debounce-input"
      {...otherProps}
      onChange={debounce(debounceSearch)}
    />
  );
};
