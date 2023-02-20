import { Header } from 'components/Layout/Header';
import { NewPageCartoForm } from 'components/PageCarto/Form/NewPageCartoForm';

export const NewPageCartoPage: React.FC = () => {
  return (
    <div>
      <Header className="py-10">Nouvelle PageCarto</Header>
      <NewPageCartoForm />
    </div>
  );
};
