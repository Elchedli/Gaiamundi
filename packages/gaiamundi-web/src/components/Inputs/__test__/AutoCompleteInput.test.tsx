import { fireEvent, render } from '@testing-library/react';
import { AutoCompleteInput } from '../AutoCompleteInput';

const options = [
  { id: 1, created_at: '', updated_at: '', name: 'Option 1' },
  { id: 2, created_at: '', updated_at: '', name: 'Option 2' },
  { id: 3, created_at: '', updated_at: '', name: 'Option 3' },
];
const props = {
  labelField: 'name',
  placeholder: 'placeholder',
  onSelect: jest.fn(),
  onCreate: jest.fn(),
};

describe('AutoCompleteInput', () => {
  it('renders the options list when a string is in the input', () => {
    const { getByTestId, getByText } = render(
      <AutoCompleteInput options={options} {...props} />
    );

    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'op' } });

    const option1 = getByText('Option 1');
    const option2 = getByText('Option 2');
    const option3 = getByText('Option 3');

    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });
  it('updates the liste of options when a option is clicked', () => {
    const handleChange = jest.fn();
    const { getByText, getByTestId } = render(
      <AutoCompleteInput options={options} {...props} onSelect={handleChange} />
    );

    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'op' } });
    const option1 = getByText('Option 1');
    fireEvent.click(getByText('Option 1'));
    fireEvent.change(input, { target: { value: 'op' } });
    const option2 = getByText('Option 2');
    const option3 = getByText('Option 3');
    expect(option1).not.toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });
});
