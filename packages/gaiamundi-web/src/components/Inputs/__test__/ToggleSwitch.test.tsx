import { fireEvent, render } from '@testing-library/react';
import { ToggleSwitch } from '../ToggleSwitch';

describe('ToggleSwitch', () => {
  it('renders correctly', () => {
    const { container } = render(
      <ToggleSwitch label="Test" defaultChecked={false} onChange={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  it('calls onChange function when switch is clicked', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <ToggleSwitch label="Test" defaultChecked={false} onChange={onChange} />
    );
    fireEvent.click(getByTestId('toggle-switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('displays the correct label', () => {
    const label = 'Test Label';
    const { getByText } = render(
      <ToggleSwitch label={label} defaultChecked={false} onChange={jest.fn()} />
    );
    expect(getByText(label)).toBeInTheDocument();
  });

  it('starts with the correct default state and action working on toggle', async () => {
    const defaultChecked = true;
    const { getByTestId } = render(
      <ToggleSwitch
        label="Test"
        defaultChecked={defaultChecked}
        onChange={jest.fn()}
      />
    );
    const toggleSwitch = getByTestId('toggle-switch');
    expect(toggleSwitch).toHaveClass('bg-blue-600');
    fireEvent.click(toggleSwitch);
    expect(toggleSwitch).toHaveClass('bg-gray-200');
  });
});
