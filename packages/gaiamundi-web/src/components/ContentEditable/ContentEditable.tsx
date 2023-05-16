import { PencilSquareIcon } from '@heroicons/react/24/solid';
import classnames from 'classnames';
import LoadingSpinner from 'components/Icons/LoadingSpinner';
import React, { useEffect, useRef } from 'react';

interface ContentEditableProps {
  value: string;
  isLoading: boolean;
  className: string;
  onInput: (event: React.FormEvent<HTMLHeadingElement>) => void;
  onBlur: () => void;
  canEdit?: boolean;
}

export const ContentEditable: React.FC<ContentEditableProps> = ({
  value,
  className,
  isLoading,
  onInput,
  onBlur,
  canEdit,
}) => {
  const valueRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (valueRef.current && valueRef.current.innerText !== value) {
      valueRef.current.innerText = value;
    }
  }, [value]);

  return (
    <div className={classnames('flex items-center', className)}>
      <div
        ref={valueRef}
        className={
          'bg-white border border-slate-100 hover:border-slate-400 px-2'
        }
        contentEditable={canEdit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }}
        onInput={onInput}
        onBlur={onBlur}
        suppressContentEditableWarning={true}
        data-testid="content-editable"
      />
      {isLoading ? (
        <LoadingSpinner className="ml-2 h-6 w-6 text-slate-400" />
      ) : (
        <PencilSquareIcon className="ml-2 h-6 w-6 text-slate-400" />
      )}
    </div>
  );
};
