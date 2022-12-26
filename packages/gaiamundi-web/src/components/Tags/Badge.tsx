import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';

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
  const Content = (): JSX.Element => (
    <span
      className={classNames(
        `inline-block bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-200 dark:text-purple-900`,
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
