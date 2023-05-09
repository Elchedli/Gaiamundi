import { ChevronUpIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import type {
  ComponentProps,
  FC,
  JSXElementConstructor,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { Children, cloneElement, useMemo, useState } from 'react';
import { AccordionContent } from './AccordionContent';
import type { AccordionPanelProps } from './AccordionPanel';
import { AccordionPanel } from './AccordionPanel';
import { AccordionTitle } from './AccordionTitle';

export interface AccordionProps
  extends PropsWithChildren<ComponentProps<'div'>> {
  alwaysOpen?: boolean;
  arrowIcon?: FC<ComponentProps<'svg'>>;
  children:
    | ReactElement<AccordionPanelProps>
    | ReactElement<AccordionPanelProps>[];
  flush?: boolean;
}

const AccordionComponent: FC<AccordionProps> = ({
  alwaysOpen = false,
  arrowIcon = ChevronUpIcon,
  children,
  flush = false,
  ...props
}): JSX.Element => {
  const [isOpen, setOpen] = useState(false);

  const panels = useMemo(
    () =>
      Children.map(
        children,
        (child: ReactElement<any, string | JSXElementConstructor<any>>) =>
          cloneElement(child, {
            alwaysOpen,
            arrowIcon,
            flush,
            isOpen: isOpen === true,
            setOpen: () => setOpen(!isOpen),
          })
      ),
    [alwaysOpen, arrowIcon, children, flush, isOpen]
  );

  return (
    <div
      className={classNames(
        'divide-y divide-gray-200 border-gray-200',
        flush ? 'border-b' : 'rounded-lg'
      )}
      {...props}
    >
      {panels}
    </div>
  );
};

AccordionComponent.displayName = 'Accordion';
AccordionPanel.displayName = 'Accordion.Panel';
AccordionTitle.displayName = 'Accordion.Title';
AccordionContent.displayName = 'Accordion.Content';

export const Accordion = Object.assign(AccordionComponent, {
  Panel: AccordionPanel,
  Title: AccordionTitle,
  Content: AccordionContent,
});
