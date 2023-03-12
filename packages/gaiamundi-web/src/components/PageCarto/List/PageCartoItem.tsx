import excerptHtml from 'excerpt-html';
import { Link } from 'react-router-dom';

import { Badge } from 'components/Tags/Badge';
import config from 'config';
import { ApiData } from 'interfaces/api';
import { UploadedFile } from 'interfaces/file';
import { PageCarto } from 'interfaces/page-carto';

const getThumbnailUrl = (cover: ApiData<UploadedFile>) => {
  const imgUrl = cover?.formats['thumbnail'].url;
  return imgUrl
    ? `${config.API_URL}${imgUrl}`
    : `${config.PUBLIC_URL}/imageplaceholder.png`;
};

const PageCartoItem: React.FC<ApiData<PageCarto>> = ({
  id,
  name,
  owner,
  tags,
  map,
  cover,
  html,
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
              <div className="my-1 font-bold">Carte : {map.name}</div>
              <p>{html && excerptHtml(html)}</p>
              <div className="text-xs mt-2">Créer par : {owner.username}</div>
            </div>
            <div className="mt-3">
              {tags.map((tag, index) => {
                return (
                  <Badge className="inline-block" href="#" key={index}>
                    {tag.name}
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
