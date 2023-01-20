import { Header } from 'components/Layout/Header';
import { PageCartoUserList } from 'components/PageCartoUser/PageCartoUserList';

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <Header>Dashboard</Header>
      <PageCartoUserList />
    </div>
  );
};
