import { fireEvent, render } from '@testing-library/react';
import DropZone from '../DropZone';

describe('DropZone', () => {
  it('should call onUpload with the file when a file is dropped', () => {
    const file = new File(['Dropzone File'], 'GeoMap.json', {
      type: 'application/json',
    });
    const onUpload = jest.fn();
    const { getByTestId } = render(<DropZone onUpload={onUpload} />);
    const dropZone = getByTestId('dropzone');
    fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });
    expect(onUpload).toHaveBeenCalledTimes(1);
    expect(onUpload).toHaveBeenCalledWith(file);
  });
});
