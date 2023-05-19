import { FC } from 'react';

export const PageCartoContent: FC = () => {
  const htmlContent = '<TextEditor />';
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
    </div>
  );
};
