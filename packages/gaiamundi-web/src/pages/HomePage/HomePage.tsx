import { Header } from 'components/Layout/Header';
import { PageCartoList } from 'components/PageCarto/PageCartoList';

export const HomePage: React.FC = () => {
  return (
    <div>
      <Header>{'Dernières PageCartos publiées'}</Header>
      <PageCartoList />
    </div>
  );
};

export default HomePage;
