import { FC } from 'react';

export const PageCartoContent: FC = () => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: '<TextEditor />' }}></div>
    </div>
  );
};
