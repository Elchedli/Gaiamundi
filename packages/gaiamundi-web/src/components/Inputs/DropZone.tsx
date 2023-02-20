import Download from 'components/Icons/Download';
import { FileInput } from './FileInput';
import { Label } from './Label';

type DropZoneProps = {
  onUpload: (file: File) => void;
};

const DropZone: React.FC<DropZoneProps> = ({ onUpload }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length === 0) {
      return;
    }

    onUpload(files[0]);
  };

  return (
    <div
      data-testid="dropzone"
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
            <span>
              <span className="font-semibold">Cliquer pour ajouter </span>
              ou glisser et déposer
            </span>
          </p>
        </div>
        <FileInput isHidden={true} onUpload={onUpload} />
      </Label>
    </div>
  );
};

export default DropZone;
