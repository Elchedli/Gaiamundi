// This file will be deleted in future push
import React, { useState } from 'react';

export const FileDragDrop = () => {
  const [fileContents, setFileContents] = useState('');

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files.length === 0) return;

    const file = files[0];

    const reader = new FileReader();

    reader.onload = (event: any) => {
      setFileContents(event.target.result);
    };

    reader.readAsText(file);
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => e.preventDefault()}
      style={{
        width: 200,
        height: 200,
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p>Drop a file here to see its contents.</p>
      {fileContents && (
        <p>
          <strong>File contents:</strong>
          <br />
          {fileContents}
        </p>
      )}
    </div>
  );
};
