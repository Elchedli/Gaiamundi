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
    const { container, getByTestId } = render(
      <ToggleSwitch label="Test" defaultChecked={false} onChange={onChange} />
    );
    fireEvent.click(getByTestId('toggle-switch'));
    expect(onChange).toHaveBeenCalledWith(true);
    expect(container).toMatchSnapshot();
  });

  it('displays the correct label', () => {
    const label = 'Test Label';
    const { container, getByText } = render(
      <ToggleSwitch label={label} defaultChecked={false} onChange={jest.fn()} />
    );
    expect(getByText(label)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('starts with the correct default state and action working on toggle', async () => {
    const defaultChecked = true;
    const { container, getByTestId } = render(
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
    expect(container).toMatchSnapshot();
  });
});
