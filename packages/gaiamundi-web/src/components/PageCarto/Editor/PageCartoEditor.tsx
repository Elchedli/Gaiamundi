import { FC, useRef } from 'react';
import { PageCartoMap } from './PageCartoMap';
import { PageCartoPanels } from './PageCartoPanels';

export const PageCartoEditor: FC = () => {
  const panelRef = useRef({} as HTMLDivElement);
  let startX = 0;
  let panelWidth = 0;
  const handleMouseDown = (event: { pageX: number }) => {
    startX = event.pageX;
    panelWidth = panelRef.current?.offsetWidth;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  const handleMouseMove = (event: { pageX: number }) => {
    const diffX = event.pageX - startX;
    const newWidth = panelWidth - diffX;
    if (newWidth >= 0) {
      panelRef.current.style.width = newWidth + 'px';
    }
  };
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  return (
    <>
      <div
        data-testid="page-panels"
        ref={panelRef}
        style={{
          position: 'absolute',
          right: '0',
          maxWidth: '1390px',
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="grid grid-cols-3 h-full">
          <div className="col-span-2 h-full">
            <PageCartoMap />
          </div>

          <div className="col-span cursor-col-resize h-5/6">
            <PageCartoPanels />
          </div>
        </div>
      </div>
    </>
  );
};
