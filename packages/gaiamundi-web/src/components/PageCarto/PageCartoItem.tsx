import { Link } from 'react-router-dom';
import { PageCarto } from 'interfaces/page-carto';
import { Badge } from 'components/Tags/Badge';
import Spinner from 'components/Icons/Spinner';

const PageCartoItem: React.FC<PageCarto> = ({
  id,
  attributes: { name, owner, tags, map, cover },
}) => {
  console.log(tags?.data);
  const ImgUrl = cover?.data?.attributes.formats['thumbnail'].url;
  return (
    <div className="group border pb-2">
      <Link to={`/page-carto/${id}?populate=*`}>
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-400 xl:aspect-w-7 xl:aspect-h-8">
          {
            <img
              src={
                ImgUrl
                  ? 'http://localhost:1337' + ImgUrl
                  : process.env.PUBLIC_URL + '/imageplaceholder.png'
              }
              className="h-48 w-full object-cover object-center group-hover:opacity-75"
            />
          }
        </div>
        <div className="px-2 pt-2">
          <h3 className="text-lg font-medium text-gray-900">Titre: {name}</h3>
          <h4 className="text-xs text-gray-500 mt-0.5">
            Nom Map : {map.data?.attributes?.name}
          </h4>
          <h4 className="text-xs text-gray-500">
            Créer par : {owner?.data?.attributes?.username}
          </h4>
        </div>
      </Link>
      <h4 className="text-xs text-gray-500 mt-2">
        Tags :
        {tags?.data?.map((tag, index: number) => {
          // console.log(tag.attributes?.);
          return (
            <Badge href="#" key={index} icon={<Spinner />}>
              {tag.attributes.name}
            </Badge>
          );
        })}
      </h4>
    </div>
  );
};

export default PageCartoItem;
