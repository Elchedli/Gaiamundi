import { NewPageCartoForm } from 'components/Forms/NewPageCartoForm';
import { Header } from 'components/Layout/Header';

export const NewPageCartoPage: React.FC = () => {
  return (
    <div>
      <Header className="py-10">Nouvelle PageCarto</Header>
      <NewPageCartoForm />
    </div>
  );
};
