import { Header } from 'components/Layout/Header';
import { PageCartoUserInterface } from 'components/PageCartoUser/PageCartoUserInterface';

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <Header>Dashboard</Header>
      <PageCartoUserInterface />
    </div>
  );
};
