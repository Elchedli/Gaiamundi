import { usePageCarto } from 'hooks/usePageCarto';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { updatePageCarto } from 'services/page-carto';
import { ContentEditable } from '../ContentEditable/ContentEditable';

interface TitlePageCartoEditProps {
  canEdit: boolean;
}

export const TitlePageCartoEdit: React.FC<TitlePageCartoEditProps> = ({
  canEdit,
}) => {
  const { data: pageCarto } = usePageCarto();
  const [pageTitle, setPageTitle] = useState(pageCarto?.data.name || '');
  const pageId = pageCarto?.data.id || 0;

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async () => {
      return await updatePageCarto(pageId, { name: pageTitle });
    },
  });

  const handleChange = (event: React.FormEvent<HTMLHeadingElement>) => {
    const newTitle = event.currentTarget.innerText;
    setPageTitle(newTitle);
  };

  const handleBlur = async () => {
    await mutateAsync();
  };

  return (
    <ContentEditable
      value={pageTitle}
      isLoading={isLoading}
      onInput={handleChange}
      onBlur={handleBlur}
      className="w-full flex-grow text-slate-950 text-xl px-2 focus:outline-none"
      canEdit={canEdit}
    />
  );
};
