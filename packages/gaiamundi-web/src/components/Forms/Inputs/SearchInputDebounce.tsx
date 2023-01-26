import { TextInput } from 'components/Forms/Inputs/TextInput';
import { useState, useEffect, ComponentProps } from 'react';

export type InputDebounceProps = ComponentProps<'input'> & {
  onSearch: (searchTerm: string) => void;
};

export const SearchInputDebounce = (
  { onSearch }: InputDebounceProps,
  otherProps: any
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      onSearch(searchTerm);
    }, 600);
    setTimeoutId(id);
    return () => clearTimeout(id);
  }, [searchTerm, onSearch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  return <TextInput {...otherProps} onChange={handleChange} />;
};
