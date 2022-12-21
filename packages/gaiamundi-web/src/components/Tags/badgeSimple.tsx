import type { ComponentProps, FC, PropsWithChildren } from 'react';

export interface FlowbiteBadgeTheme {
  base: string;
  href: string;
  icon: {
    off: string;
    on: string;
    size: BadgeSizes;
  };
  size: BadgeSizes;
}

export interface BadgeSizes {
  [key: string]: string;
}

export interface BadgeProps
  extends PropsWithChildren<Omit<ComponentProps<'span'>, 'color'>> {
  href?: string;
  icon?: FC<ComponentProps<'svg'>>;
  size?: keyof BadgeSizes;
}

export const Badgelala: FC<BadgeProps> = ({
  children,
  href,
  icon: Icon,
}): JSX.Element => {
  const Content = (): JSX.Element => (
    <span data-testid="flowbite-badge">
      {Icon && <Icon aria-hidden data-testid="flowbite-badge-icon" />}
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
