import MapDownload from 'components/Icons/MapDownload';
import { FileInputHidden } from './FileInput';
const DropZoneMap: React.FC = () => {
  return (
    <div className="self-center">
      <h2>A partir d&apos;une carte GeoJSON</h2>
      <div>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-29 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <MapDownload />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click pour ajouter</span> ou
              glisser et déposer
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Fichier ZIP (MAX. 300mb)
            </p>
          </div>
          <FileInputHidden />
        </label>
      </div>
    </div>
  );
};

export default DropZoneMap;
