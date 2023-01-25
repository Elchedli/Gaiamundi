import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';

interface BadgeProps
  extends PropsWithChildren<Omit<ComponentProps<'span'>, 'color'>> {
  href: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export const Badge: FC<BadgeProps> = ({
  children,
  href,
  icon: Icon,
  className,
  disabled,
  ...props
}): JSX.Element => {
  const Content = (): JSX.Element => (
    <span
      className={classNames(
        `inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2`,
        disabled ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-700',
        className
      )}
      {...props}
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
