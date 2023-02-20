import { cleanup, fireEvent, render } from '@testing-library/react';
import { ListBoxInput } from '../ListBoxInput';

afterEach(cleanup);

describe('ListBoxInput', () => {
  const options = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
  ];

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
    fireEvent.click(getByText('Option 2'));

    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('displays the selected label on the button', () => {
    const onChange = jest.fn();
    const { getByText, getByRole } = render(
      <ListBoxInput defaultValue={1} options={options} onChange={onChange} />
    );

    expect(getByRole('button')).toHaveTextContent('Option 1');

    fireEvent.click(getByRole('button'));
    fireEvent.click(getByText('Option 2'));

    expect(getByRole('button')).toHaveTextContent('Option 2');
  });
});
