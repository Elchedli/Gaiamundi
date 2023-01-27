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
      {...props}
      className={classNames(
        `bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2`,
        className
      )}
    >
      {Icon}
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
