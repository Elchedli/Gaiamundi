import { cleanup, fireEvent, render } from '@testing-library/react';
import { FileInput, FileInputProps } from 'components/Forms/Inputs/FileInput';

//this is for refreshing the upload file content
afterEach(cleanup);

describe('FileInput', () => {
  const defaultProps: FileInputProps = {
    onUpload: jest.fn(),
  };

  it('renders a label and text input with type file', () => {
    const { getByText } = render(<FileInput {...defaultProps} />);
    expect(getByText('Upload a file')).toBeInTheDocument();
  });

  it('renders a hidden text input when isHidden prop is set to true', () => {
    const { getByTestId } = render(<FileInput {...defaultProps} isHidden />);
    expect(getByTestId('hidden-file-input').getAttribute('class')).toContain(
      'hidden'
    );
  });

  it('calls onUpload prop with selected file when file is selected', () => {
    const { getByTestId } = render(<FileInput {...defaultProps} isHidden />);
    const fileInput = getByTestId('hidden-file-input');
    const file = new File(['test-file'], 'test-file.json', {
      type: 'text/plain',
    });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(defaultProps.onUpload).toHaveBeenCalledTimes(1);
    expect(defaultProps.onUpload).toHaveBeenCalledWith(file);
  });

  it('should call onUpload prop when a file is selected', () => {
    const onUpload = jest.fn();
    const { container } = render(<FileInput onUpload={onUpload} />);
    const label = container.querySelector('label');
    const input = container.querySelector('input');
    expect(label?.textContent).toBe('Upload a file');
    expect(input).not.toBeNull();
    expect(input?.getAttribute('type')).toBe('file');
  });
});
