import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { usePageCarto } from 'hooks/usePageCarto';
import { useRef, useState } from 'react';
import { updatePageCarto } from 'services/page-carto';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

export const TitlePageCartoEdit = () => {
  const { data: pageCarto } = usePageCarto();
  const [pageTitle, setPageTitle] = useState(() => pageCarto?.data.name || '');
  const pageTitleRef = useRef(pageTitle);

  const handleChange = (event: ContentEditableEvent) => {
    const newTitle = event.target.value;
    // Do something with newTitle
    setPageTitle(newTitle);
    pageTitleRef.current = newTitle;
  };

  const handleBlur = () => {
    const pageId = pageCarto?.data.id;
    if (pageId) {
      updatePageCarto(pageId, { name: pageTitleRef.current });
    }
  };

  return (
    <div className="flex flex-wrap border-2 rounded-lg border-black p-0.5">
      <ContentEditable
        className="text-slate-950 text-xl"
        key={pageCarto?.data.id}
        html={pageTitle || pageCarto?.data.name || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        tagName="h1"
      />

      <PencilSquareIcon className="ml-2 h-4 w-4" />
    </div>
  );
};
