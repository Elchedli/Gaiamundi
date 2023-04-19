import { render, fireEvent, waitFor } from '@testing-library/react';
import { EditableTitle } from '../../ContentEditable/ContentEditable';

describe('EditableTitle', () => {
  const initialTitle = 'Titre initial';
  const updatedTitle = 'Titre modifié';

  it('renders the initial title', () => {
    const initialTitle = '';
    const handleChange = jest.fn();
    const handleBlur = jest.fn();
    const { getByTestId } = render(
      <EditableTitle
        value={initialTitle}
        onInput={handleChange}
        onBlur={handleBlur}
        className=""
      />
    );
    const titleElement = getByTestId('editable-title');
    expect(titleElement.textContent).toBe(initialTitle);
  });

  it('updates the title when edited and calls onInput with the correct event', async () => {
    const handleInput = jest.fn();
    const handleBlur = jest.fn();
    const { getByTestId } = render(
      <EditableTitle
        value={initialTitle}
        className="test-class"
        onInput={handleInput}
        onBlur={handleBlur}
      />
    );

    const titleElement = getByTestId('editable-title');
    fireEvent.focus(titleElement);
    fireEvent.input(titleElement, { target: { innerText: updatedTitle } });
    fireEvent.blur(titleElement);

    await waitFor(() => {
      expect(titleElement.innerText).toBe(updatedTitle);
      expect(handleInput).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            innerText: updatedTitle,
          }),
        })
      );
    });
  });

  it('calls onBlur when the input element loses focus', () => {
    const handleInput = jest.fn();
    const handleBlur = jest.fn();
    const { getByTestId } = render(
      <EditableTitle
        value={initialTitle}
        className="test-class"
        onInput={handleInput}
        onBlur={handleBlur}
      />
    );

    const titleElement = getByTestId('editable-title');
    fireEvent.focus(titleElement);
    fireEvent.blur(titleElement);
    expect(handleBlur).toHaveBeenCalled();
  });
});
