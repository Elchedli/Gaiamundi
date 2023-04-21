import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';

interface BadgeProps
  extends PropsWithChildren<Omit<ComponentProps<'span'>, 'color'>> {
  href?: string;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
}

export const Badge: FC<BadgeProps> = ({
  children,
  href,
  iconBefore,
  iconAfter,
  className,
  ...props
}): JSX.Element => {
  const Content = (): JSX.Element => (
    <span
      {...props}
      className={classNames(
        `bg-gray-200 text-gray-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 mb-2`,
        className
      )}
    >
      {iconBefore}
      {children && <span>{children}</span>}
      {iconAfter}
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
