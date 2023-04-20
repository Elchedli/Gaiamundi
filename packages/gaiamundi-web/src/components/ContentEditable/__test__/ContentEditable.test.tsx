import { fireEvent, render, waitFor } from '@testing-library/react';
import { ContentEditable } from '../ContentEditable';

describe('ContentEditable', () => {
  const initialValue = 'Value initial';
  const updatedValue = 'Value modifié';

  it('renders the initial title', () => {
    const initialValue = '';
    const handleChange = jest.fn();
    const handleBlur = jest.fn();
    const { getByTestId } = render(
      <ContentEditable
        value={initialValue}
        isLoading={false}
        onInput={handleChange}
        onBlur={handleBlur}
        className=""
      />
    );
    const valueElement = getByTestId('content-editable');
    expect(valueElement.textContent).toBe(initialValue);
  });

  it('updates the title when edited and calls onInput with the correct event', async () => {
    const handleInput = jest.fn();
    const handleBlur = jest.fn();
    const { getByTestId } = render(
      <ContentEditable
        value={initialValue}
        isLoading={false}
        className="test-class"
        onInput={handleInput}
        onBlur={handleBlur}
      />
    );

    const valueElement = getByTestId('content-editable');
    fireEvent.focus(valueElement);
    fireEvent.input(valueElement, { target: { innerText: updatedValue } });
    fireEvent.blur(valueElement);

    await waitFor(() => {
      expect(valueElement.innerText).toBe(updatedValue);
      expect(handleInput).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            innerText: updatedValue,
          }),
        })
      );
    });
  });

  it('calls onBlur when the input element loses focus', () => {
    const handleInput = jest.fn();
    const handleBlur = jest.fn();
    const { getByTestId } = render(
      <ContentEditable
        value={initialValue}
        isLoading={false}
        className="test-class"
        onInput={handleInput}
        onBlur={handleBlur}
      />
    );

    const valueElement = getByTestId('content-editable');
    fireEvent.focus(valueElement);
    fireEvent.blur(valueElement);
    expect(handleBlur).toHaveBeenCalled();
  });
});
