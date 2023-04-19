import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { usePageCarto } from 'hooks/usePageCarto';
import { useRef, useState } from 'react';
import { updatePageCarto } from 'services/page-carto';
import { EditableTitle } from '../ContentEditable/ContentEditable';

export const TitlePageCartoEdit = () => {
  const { data: pageCarto } = usePageCarto();
  const [pageTitle, setPageTitle] = useState(pageCarto?.data.name || '');
  const pageTitleRef = useRef(pageTitle);

  const handleChange = (event: React.FormEvent<HTMLHeadingElement>) => {
    const newTitle = event.currentTarget.innerText;
    setPageTitle(newTitle);
    pageTitleRef.current = newTitle;
  };

  const handleBlur = async () => {
    const pageId = pageCarto?.data.id;
    if (pageId && pageTitleRef.current !== pageCarto.data.name) {
      await updatePageCarto(pageId, { name: pageTitleRef.current });
    }
  };

  return (
    <div className="flex items-center bg-gray-100 border-2 rounded-lg border-black p-1">
      <EditableTitle
        value={pageTitle}
        onInput={handleChange}
        onBlur={handleBlur}
        className="mt-2 mb-2 flex-grow text-slate-950 text-xl px-2 bg-gray-100 focus:outline-none"
      />
      <PencilSquareIcon className="ml-2 h-4 w-4 text-gray-500" />
    </div>
  );
};
