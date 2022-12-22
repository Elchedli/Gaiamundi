import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';

interface styleType {
  default: string[];
  dark: string[];
  red: string[];
  green: string[];
  yellow: string[];
  indigo: string[];
  purple: string[];
  pink: string[];
  [key: string]: string[];
}

const styles: styleType = {
  default: ['blue-100', 'blue-800', 'blue-200', 'blue-800'],
  dark: ['gray-100', 'gray-800', 'gray-700', 'gray-300'],
  red: ['red-100', 'red-800', 'red-200', 'red-900'],
  green: ['green-100', 'green-800', 'green-200', 'green-900'],
  yellow: ['yellow-100', 'yellow-800', 'yellow-200', 'yellow-900'],
  indigo: ['indigo-100', 'indigo-800', 'indigo-200', 'indigo-900'],
  purple: ['purple-100', 'purple-800', 'purple-200', 'purple-900'],
  pink: ['pink-100', 'pink-800', 'pink-200', 'pink-900'],
};

interface BadgeProps
  extends PropsWithChildren<Omit<ComponentProps<'span'>, 'color'>> {
  href: string;
  icon?: ReactNode;
}

export const Badge: FC<BadgeProps> = ({
  children,
  href,
  icon: Icon,
  className,
  ...props
}): JSX.Element => {
  const objectColor = Object.keys(styles);
  const selectedColor =
    styles[objectColor[Math.floor(Math.random() * objectColor.length)]];
  const Content = (): JSX.Element => (
    <span
      className={classNames(
        `inline-block bg-${selectedColor[0]} text-${selectedColor[1]} text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-${selectedColor[2]} dark:text-${selectedColor[3]}`,
        className
      )}
      {...props}
    >
      <div className="w-5 h-5 float-left mr-1">{Icon}</div>
      {children && <span>{children}</span>}
    </span>
  );

  return href ? (
    <a href={href}>
      <Content />
    </a>
  ) : (
    <Content />
  );
};
