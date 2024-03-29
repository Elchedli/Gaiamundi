import classNames from 'classnames';
import type { ComponentProps, ReactNode } from 'react';
import { forwardRef } from 'react';
import { HelperText } from './HelperText';

type Color = 'gray' | 'info' | 'failure' | 'warning' | 'success';

export interface TextAreaInputProps
  extends Omit<ComponentProps<'textarea'>, 'color' | 'ref'> {
  color?: Color;
  helperText?: ReactNode;
  shadow?: boolean;
}

const TEXTAREA_THEME_COLORS: Record<Color, string> = {
  gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
  info: 'border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-700 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-400 dark:bg-blue-100 dark:focus:border-blue-500 dark:focus:ring-blue-500',
  failure:
    'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
  warning:
    'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
  success:
    'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500',
};

export const TextAreaInput = forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>(({ className, color = 'gray', helperText, shadow, ...props }, ref) => {
  return (
    <>
      <textarea
        ref={ref}
        data-testid="textarea"
        className={classNames(
          'block p-2 w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50',
          TEXTAREA_THEME_COLORS[color],
          shadow ? 'shadow-sm dark:shadow-sm-light' : '',
          className
        )}
        {...props}
      />
      {helperText && <HelperText color={color}>{helperText}</HelperText>}
    </>
  );
});

TextAreaInput.displayName = 'TextAreaInput';
