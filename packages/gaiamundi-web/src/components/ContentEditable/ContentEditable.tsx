import React, { useRef, useEffect } from 'react';

interface EditableTitleProps {
  value: string;
  className: string;
  onInput: (event: React.FormEvent<HTMLHeadingElement>) => void;
  onBlur: () => void;
}

export const EditableTitle: React.FC<EditableTitleProps> = ({
  value,
  className,
  onInput,
  onBlur,
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current && titleRef.current.innerText !== value) {
      titleRef.current.innerText = value;
    }
  }, [value]);

  return (
    <div
      ref={titleRef}
      className={className}
      contentEditable={true}
      onInput={onInput}
      onBlur={onBlur}
      suppressContentEditableWarning={true}
      data-testid="editable-title"
    />
  );
};
