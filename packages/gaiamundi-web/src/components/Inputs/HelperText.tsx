import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';

type Color = 'gray' | 'info' | 'failure' | 'warning' | 'success';

export interface HelperTextProps
  extends PropsWithChildren<Omit<ComponentProps<'p'>, 'color'>> {
  color?: Color;
  value?: string;
}

const HELPER_TEXT_COLORS: Record<Color, string> = {
  gray: 'text-gray-500 dark:text-gray-400',
  info: 'text-blue-700 dark:text-blue-800',
  success: 'text-green-600 dark:text-green-500',
  failure: 'text-red-600 dark:text-red-500',
  warning: 'text-yellow-500 dark:text-yellow-600',
};

export const HelperText: FC<HelperTextProps> = ({
  children,
  className,
  color = 'info',
  value,
  ...props
}) => {
  return (
    <p
      className={classNames(
        'mt-2 text-sm',
        HELPER_TEXT_COLORS[color],
        className
      )}
      {...props}
    >
      {value ?? children ?? ''}
    </p>
  );
};
