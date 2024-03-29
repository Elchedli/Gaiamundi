import { FC } from 'react';
import { Label } from './Label';

import { TextInput, TextInputProps } from './TextInput';

export type FileInputProps = Omit<TextInputProps, 'type' | 'onChange'> & {
  isHidden?: boolean;
  onUpload: (file: File) => void;
};

export const FileInput: FC<FileInputProps> = ({
  onUpload,
  isHidden = false,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onUpload(files[0]);
    }
  };

  if (isHidden) {
    return (
      <TextInput
        data-testid="hidden-file-input"
        id="dropzone-file"
        className="hidden"
        aria-describedby="file_upload_help"
        {...props}
        onChange={handleChange}
        type="file"
      />
    );
  }

  return (
    <>
      <Label
        className="block mb-2 text-md font-semibold text-gray-900 dark:text-gray-300"
        htmlFor="file_upload"
      >
        Upload a file
      </Label>
      <TextInput
        className="!p-0 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        aria-describedby="file_upload_help"
        {...props}
        onChange={handleChange}
        type="file"
      />
      <div
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="user_avatar_help"
      >
        Localisez et sélectionnez le fichier que vous souhaitez télécharger.
      </div>
    </>
  );
};
