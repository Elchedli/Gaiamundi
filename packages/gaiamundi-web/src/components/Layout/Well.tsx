import * as React from 'react';

interface WellProps {
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: React.FC<any>;
  children: React.ReactNode;
}

const Well = ({ title, Icon, children }: WellProps): JSX.Element => {
  return (
    <div
      className="relative rounded-md border border-gray-200 bg-white shadow-md p-5"
      data-testid="well-component"
    >
      {title && (
        <h2 className="mb-3 text-xl font-medium text-gray-900 title-font">
          {Icon && <Icon className="h-5 w-5 text-blue-500 inline" />} {title}
        </h2>
      )}
      <div className="shadow-none">{children}</div>
    </div>
  );
};

export default Well;
