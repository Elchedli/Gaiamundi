import { usePageCarto } from 'hooks/usePageCarto';
import { useEffect } from 'react';
import PageCartoItem from './PageCartoItem';

const PageCarto = () => {
  const { pageCartos, getPageCartos } = usePageCarto();

  useEffect(() => {
    getPageCartos({ populate: '*' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="my-6 text-3xl font-extrabold text-left text-gray-900">
        {'Dernières PageCartos publiées'}
      </h2>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        {pageCartos &&
          pageCartos.map((page) => {
            const { attributes } = page;
            return (
              <PageCartoItem
                key={page.id}
                name={attributes.name}
                owner={attributes.owner}
                map={attributes.map}
                html={attributes.html}
                tags={attributes.tags}
              />
            );
          })}
      </div>
    </div>
  );
};

export default PageCarto;
