import { fireEvent, render } from '@testing-library/react';
import { SearchInputDebounce } from '../DebouncedSearchInput';

describe('DebouncedSearchInput', () => {
  it('should call onDebouncedChange after the delay', async () => {
    const onDebouncedChange = jest.fn();
    const { getByTestId } = render(
      <SearchInputDebounce onDebouncedChange={onDebouncedChange} />
    );
    const input = getByTestId('debounceInput');
    fireEvent.change(input, { target: { value: 'test' } });
    await new Promise((r) => setTimeout(r, 500));
    expect(onDebouncedChange).toHaveBeenCalledWith('test');
  });
});
