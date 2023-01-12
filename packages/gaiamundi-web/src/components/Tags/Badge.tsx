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
        `inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`,
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
