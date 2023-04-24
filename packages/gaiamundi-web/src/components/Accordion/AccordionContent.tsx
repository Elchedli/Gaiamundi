import type { ComponentProps, FC } from 'react';
import { useAccordionContext } from './AccordionPanelContext';

export const AccordionContent: FC<ComponentProps<'div'>> = ({
  children,
  ...props
}): JSX.Element => {
  const { isOpen } = useAccordionContext();

  return (
    <div
      hidden={!isOpen}
      className="animate-accordion py-5 px-5 text-sm text-gray-500 last:rounded-b-lg first:rounded-t-lg"
      {...props}
    >
      {children}
    </div>
  );
};
