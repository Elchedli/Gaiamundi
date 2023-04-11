import EditIcon from 'components/Icons/EditTitle';
import { usePageCarto } from 'hooks/usePageCarto';
import { useRef, useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { updatedTitle } from 'services/page-carto';

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
      updatedTitle(pageId, pageTitleRef.current);
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
      <EditIcon className="ml-2" />
    </div>
  );
};
