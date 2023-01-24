import { Link } from 'react-router-dom';
import excerptHtml from 'excerpt-html';
import { PageCarto } from 'interfaces/page-carto';
import { Badge } from 'components/Tags/Badge';
import config from 'config';
import { UploadedFile } from 'interfaces/file';
import { ApiData, ApiDocument } from 'interfaces/api';

const getThumbnailUrl = (cover: ApiDocument<UploadedFile>) => {
  const imgUrl = cover?.data?.attributes.formats['thumbnail'].url;
  return imgUrl
    ? `${config.API_URL}${imgUrl}`
    : `${config.PUBLIC_URL}/imageplaceholder.png`;
};

const PageCartoItem: React.FC<ApiData<PageCarto>> = ({
  id,
  attributes: { name, owner, tags, map, cover, html },
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Link to={`/page-carto/${id}`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-400 xl:aspect-w-7 xl:aspect-h-8">
          <img
            src={getThumbnailUrl(cover)}
            className="h-48 w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <div className="p-3">
          <h2>{name}</h2>
          <div className="text-gray-500">
            <div className="text-sm my-1">
              <div className="my-1 font-bold">
                Carte : {map?.data?.attributes?.name}
              </div>
              <p>{html && excerptHtml(html)}</p>
              <div className="text-xs mt-2">
                Créer par : {owner?.data?.attributes?.username}
              </div>
            </div>
            <div className="mt-3">
              {tags?.data?.map((tag, index) => {
                return (
                  <Badge href="#" key={index}>
                    {tag.attributes.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PageCartoItem;
