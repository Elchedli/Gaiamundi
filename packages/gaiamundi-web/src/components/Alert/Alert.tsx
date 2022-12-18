import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren, ReactNode } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';

export interface FlowbiteAlertTheme {
  base: string;
  borderAccent: string;
  wrapper: string;
  closeButton: {
    base: string;
    icon: string;
    color: AlertColors;
  };
  color: AlertColors;
  icon: string;
  rounded: string;
}

type AlertType = 'failure' | 'info' | 'success' | 'warning';

export type AlertColors = {
  [key in AlertType]: string;
};

const ALERT_COLOR_MAP: AlertColors = {
  failure: 'red',
  info: 'blue',
  success: 'green',
  warning: 'orange',
};

export interface AlertProps
  extends PropsWithChildren<Omit<ComponentProps<'div'>, 'color'>> {
  additionalContent?: ReactNode;
  type?: AlertType;
  icon?: FC<ComponentProps<'svg'>>;
  onDismiss?: boolean | (() => void);
  rounded?: boolean;
}

export const Alert: FC<AlertProps> = ({
  additionalContent,
  children,
  type = 'failure',
  icon: Icon,
  onDismiss,
  rounded = true,
  className,
}) => {
  const color = ALERT_COLOR_MAP[type];
  const bgColor = `bg-${color}-200`;
  const borderColor = `border border-${color}-500`;
  const textColor = `text-${color}-700`;
  return (
    <div
      className={classNames(
        'p-3 my-3',
        rounded && 'rounded',
        borderColor,
        bgColor,
        textColor,
        className
      )}
      role="alert"
    >
      <div className="flex flex-row">
        {Icon && (
          <Icon
            width={24}
            height={24}
            stroke={'current'}
            className={classNames('mr-2')}
          />
        )}
        <div>{children}</div>
        {typeof onDismiss === 'function' && (
          <button aria-label="Dismiss" onClick={onDismiss} type="button">
            <XCircleIcon />
          </button>
        )}
      </div>
      {additionalContent && <div>{additionalContent}</div>}
    </div>
  );
};
