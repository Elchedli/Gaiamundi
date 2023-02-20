import { Header } from 'components/Layout/Header';
import { Dashboard } from 'components/PageCarto/Dashboard/Dashboard';

export const DashboardPage: React.FC = () => {
  return (
    <div>
      <Header>Mes PageCartos</Header>
      <Dashboard />
    </div>
  );
};
