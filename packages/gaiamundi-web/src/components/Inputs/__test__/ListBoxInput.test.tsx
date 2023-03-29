import { fireEvent, render } from '@testing-library/react';
import { ListBoxInput } from '../ListBoxInput';

const options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

describe('ListBoxInput', () => {
  it('renders the options list when button is clicked', () => {
    const onChange = jest.fn();
    const { getByRole, getAllByTestId } = render(
      <ListBoxInput defaultValue={1} options={options} onChange={onChange} />
    );

    fireEvent.click(getByRole('button'));

    expect(getAllByTestId('list-boxinput')).toHaveLength(3);
  });

  it('updates the selected value when an option is clicked', () => {
    const handleChange = jest.fn();
    const { getByText, getByRole } = render(
      <ListBoxInput
        defaultValue={1}
        options={options}
        onChange={handleChange}
      />
    );
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByText(options[1].label));

    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('displays the selected label on the button', () => {
    const onChange = jest.fn();
    const { getByText, getByRole } = render(
      <ListBoxInput defaultValue={1} options={options} onChange={onChange} />
    );

    expect(getByRole('button')).toHaveTextContent(options[0].label);

    fireEvent.click(getByRole('button'));
    fireEvent.click(getByText(options[1].label));

    expect(getByRole('button')).toHaveTextContent(options[1].label);
  });
});
