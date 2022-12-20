import Download from 'components/Icons/Download';
import { useState } from 'react';
import { FileInputHidden } from './FileInput';
import { Label } from './Label';

const DropZone: React.FC = () => {
  const [fileContents, setFileContents] = useState({
    filename: '',
    filecontent: '',
  });

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      setFileContents({
        filename: file.name,
        filecontent: event.target.result,
      });
    };
    reader.readAsText(file);
  };

  const onUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      setFileContents({
        filename: file.name,
        filecontent: event.target.result,
      });
    };
    reader.readAsText(file);
  };

  return (
    <div className="self-center">
      <h2>A partir d&apos;une carte GeoJSON</h2>
      <div
        onDrop={handleDrop}
        onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
      >
        <Label
          htmlFor="dropzone-file"
          className="flex flex-col border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Download />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              {fileContents.filename || (
                <span>
                  <span className="font-semibold">Cliquer pour ajouter </span>
                  ou glisser et déposer
                </span>
              )}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              (MAX. 300mb)
            </p>
          </div>
          <FileInputHidden onUpload={onUpload} />
        </Label>
      </div>
    </div>
  );
};

export default DropZone;
