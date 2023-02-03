import { Header } from 'components/Layout/Header';
import { Dashboard } from 'components/PageCartoUser/Dashboard';

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <Header>Mes PageCartos</Header>
      <Dashboard />
    </div>
  );
};
