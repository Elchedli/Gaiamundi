import classNames from 'classnames';
import {
  Children,
  cloneElement,
  FC,
  PropsWithChildren,
  ReactElement,
  useMemo,
} from 'react';

import { ButtonComponentProps } from './Button';

export type ButtonGroupProps = PropsWithChildren<{
  pill?: boolean;
  outline?: boolean;
  className?: string;
}>;

const ButtonGroup: FC<ButtonGroupProps> = ({
  children,
  pill,
  outline,
  className,
}) => {
  const items = useMemo(
    () =>
      Children.map(
        children as ReactElement<ButtonComponentProps>[],
        (child, index) =>
          cloneElement(child, {
            pill,
            outline,
            positionInGroup:
              index === 0
                ? 'start'
                : index ===
                  (children as ReactElement<ButtonComponentProps>[]).length - 1
                ? 'end'
                : 'middle',
          })
      ),
    [children, outline, pill]
  );

  return (
    <div className={classNames('inline-flex', className)} role="group">
      {items}
    </div>
  );
};

ButtonGroup.displayName = 'Button.Group';
export default ButtonGroup;
