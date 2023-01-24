import { Label } from 'components/Forms/Inputs/Label';
import { TextInput } from 'components/Forms/Inputs/TextInput';
import { PageCartoUserList } from 'components/PageCartoUser/PageCartoUserList';
import { Badge } from 'components/Tags/Badge';
import { ApiData } from 'interfaces/api';
import { Tag } from 'interfaces/page-carto';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { ContentType, strapi } from 'services/strapi';

export const PageCartoUserInterface: React.FC = () => {
  const [nameInput, setNameInput] = useState('');
  const [tagsSelected, setTagsSelected] = useState<ApiData<Tag>[]>([]);
  const { data: response } = useQuery(
    'page-carto-tags',
    () => {
      return strapi.get<Tag>(ContentType.TAGS, {
        populate: '*',
        sort: 'createdAt:desc',
      });
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
    }
  );
  const handleTag = (index: number, choice: string) => {
    switch (choice) {
      case 'add': {
        setTagsSelected([
          ...tagsSelected,
          response?.data.at(index) as ApiData<Tag>,
        ]);
        response?.data.splice(index, 1);
        break;
      }
      case 'delete': {
        const element = tagsSelected.at(index);
        tagsSelected.splice(index, 1);
        response?.data.push(element as ApiData<Tag>);
        setTagsSelected([...tagsSelected]);
      }
    }
  };

  return (
    <>
      <div>
        <Label htmlFor="Nom">Recherche</Label>
        <TextInput
          id="pageCarto.search"
          className="w-fit mb-10"
          name="inputSearch"
          onChange={(e) => setNameInput(e.target.value)}
        />
        <Label htmlFor="Nom">Tags : </Label>
        {response?.data.map((tag, index) => {
          return (
            <Badge href="#" key={index} onClick={() => handleTag(index, 'add')}>
              {tag.attributes.name}
            </Badge>
          );
        })}
        <br />
        {tagsSelected.map((tag, index) => {
          return (
            <Badge
              href="#"
              key={index}
              onClick={() => handleTag(index, 'delete')}
            >
              {tag.attributes.name}
            </Badge>
          );
        })}
      </div>
      <PageCartoUserList
        nameInput={nameInput}
        tagsTable={tagsSelected.map((tag) => tag.attributes.name)}
      />
    </>
  );
};
