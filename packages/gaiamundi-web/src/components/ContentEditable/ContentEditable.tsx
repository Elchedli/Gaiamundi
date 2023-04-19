import React, { useRef, useEffect } from 'react';

interface ContentEditableProps {
  value: string;
  className: string;
  onInput: (event: React.FormEvent<HTMLHeadingElement>) => void;
  onBlur: () => void;
}

export const ContentEditable: React.FC<ContentEditableProps> = ({
  value,
  className,
  onInput,
  onBlur,
}) => {
  const valueRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (valueRef.current && valueRef.current.innerText !== value) {
      valueRef.current.innerText = value;
    }
  }, [value]);

  return (
    <div
      ref={valueRef}
      className={className}
      contentEditable={true}
      onInput={onInput}
      onBlur={onBlur}
      suppressContentEditableWarning={true}
      data-testid="content-editable"
    />
  );
};
