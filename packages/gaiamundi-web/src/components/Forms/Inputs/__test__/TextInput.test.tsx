import { fireEvent, render } from '@testing-library/react';
import { TextInput } from 'components/Forms/Inputs/TextInput';

describe('TextInput Assertions', () => {
  it('should render the input with correct classname and properties', () => {
    const { getByTestId } = render(<TextInput data-testid="input" />);
    const input = getByTestId('input');
    expect(input).toHaveClass('border');
  });

  it('should render the helper text when provided', () => {
    const helperText = 'This is a helper text';
    const { getByText } = render(<TextInput helperText={helperText} />);
    expect(getByText(helperText)).toBeInTheDocument();
  });

  it('should apply the correct color styles based on the provided color prop', () => {
    const { getByTestId } = render(
      <TextInput data-testid="input" color="green" />
    );
    const input = getByTestId('input');
    expect(input).toHaveClass('border-green-500');
    expect(input).toHaveClass('bg-green-50');
  });

  it('should render the prefix and addon when provided', () => {
    const prefix = 'Prefix';
    const addon = 'Addon';
    const { getByText } = render(<TextInput prefix={prefix} addon={addon} />);
    expect(getByText(prefix)).toBeInTheDocument();
    expect(getByText(addon)).toBeInTheDocument();
  });

  it('should render the shadow when shadow prop is provided', () => {
    const { getByTestId } = render(<TextInput data-testid="input" shadow />);
    const input = getByTestId('input');
    expect(input).toHaveClass('shadow-sm');
  });
});

describe('TextInput Events', () => {
  test('should handle changes in the input value', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <TextInput data-testid="input" onChange={onChange} />
    );
    const input = getByTestId('input');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
