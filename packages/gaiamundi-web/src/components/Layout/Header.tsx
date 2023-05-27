import { ComponentProps } from 'react';

export type LabelProps = ComponentProps<'label'>;

export const Header: React.FC<LabelProps> = ({ children }) => {
  return <h1 className="my-4 text-3xl font-extrabold">{children}</h1>;
};
