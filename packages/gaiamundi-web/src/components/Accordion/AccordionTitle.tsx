import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';
import { useAccordionContext } from './AccordionPanelContext';

export interface AccordionTitleProps extends ComponentProps<'button'> {
  arrowIcon?: FC<ComponentProps<'svg'>>;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const AccordionTitle: FC<AccordionTitleProps> = ({
  as: Heading = 'h2',
  children,
  ...props
}): JSX.Element => {
  const {
    arrowIcon: ArrowIcon,
    flush,
    isOpen,
    setOpen,
  } = useAccordionContext();

  const onClick = () => typeof setOpen !== 'undefined' && setOpen(!isOpen);

  return (
    <>
      <button
        className={classNames(
          'flex w-full items-center justify-between py-5 px-5 text-left font-medium text-gray-500 dark:text-gray-400',
          flush ? '!bg-transparent dark:!bg-transparent' : 'hover:bg-gray-100 ',
          isOpen ? 'text-gray-900 bg-gray-100' : '',
          props.className
        )}
        onClick={onClick}
        type="button"
        {...props}
      >
        <Heading className="">{children}</Heading>
        {ArrowIcon && (
          <ArrowIcon
            className={classNames(
              'h-6 w-6 shrink-0',
              isOpen ? 'rotate-180' : ''
            )}
          />
        )}
      </button>
    </>
  );
};
