import { fireEvent, render } from '@testing-library/react';
import { TextAreaInput } from '../TextAreaInput';

describe('TextAreaInput', () => {
  it('should have role="textbox" by default', () => {
    const textArea = render(<TextAreaInput />).getByRole('textbox');

    expect(textArea).toBeInTheDocument();
  });

  it('should handle changes to the input value', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<TextAreaInput onChange={onChange} />);
    const input = getByTestId('textarea');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.any(Object) })
    );
  });
});
