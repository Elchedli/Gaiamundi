import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

export interface ToggleClasses {
  off: string;
  on: string;
}

export interface FlowbiteCardRootTheme {
  base: string;
  children: string;
  horizontal: ToggleClasses;
  href: string;
}

export interface FlowbiteCardImageTheme {
  base: string;
  horizontal: ToggleClasses;
}

export interface CardProps extends PropsWithChildren<ComponentProps<'div'>> {
  horizontal?: boolean;
  href?: string;
  imgAlt?: string;
  imgSrc?: string;
  selected?: boolean;
  title?: string;
}

export const Card: FC<CardProps> = ({
  children,
  className,
  horizontal,
  href,
  imgAlt,
  imgSrc,
  selected,
  title,
  ...props
}) => {
  const Component = typeof href === 'undefined' ? 'div' : 'a';
  const theirProps = props as object;

  const theme = {
    root: {
      base: 'flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700',
      children: 'flex h-full flex-col justify-center gap-4',
      horizontal: {
        off: 'flex-col',
        on: 'flex-col md:max-w-xl md:flex-row',
      },
      href: 'hover:bg-gray-100 dark:hover:bg-gray-700',
    },
    img: {
      base: '',
      horizontal: {
        off: 'rounded-t-lg',
        on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg',
      },
    },
    selected: {
      base: 'bg-blue-300 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700',
      horizontal: {
        off: 'rounded-t-lg',
        on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg',
      },
    },
  };

  return (
    <Component
      data-testid="card"
      href={href}
      title={title}
      className={classNames(
        theme.root.horizontal[horizontal ? 'on' : 'off'],
        href && theme.root.href,
        className,
        selected ? theme.selected.base : theme.root.base
      )}
      {...theirProps}
    >
      {imgSrc && (
        <img
          alt={imgAlt ?? ''}
          src={imgSrc}
          className={classNames(
            theme.img.base,
            theme.img.horizontal[horizontal ? 'on' : 'off']
          )}
        />
      )}
      <div className={theme.root.children}>{children}</div>
    </Component>
  );
};
