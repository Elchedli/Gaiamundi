import { useRequireAuth } from 'hooks/useRequireAuth';
import { AccountEditForm } from 'components/Forms/AccountEditForm';
import { Header } from 'components/Layout/Header';

export const AccountEditPage: React.FC = () => {
  const { user } = useRequireAuth();

  if (!user) return null;

  return (
    <div>
      <Header>Modifier mon compte</Header>
      <div className="flex">
        <main className="w-2/3 px-5 py-6 mx-auto overflow-hidden bg-white rounded-lg shadow-lg block">
          <AccountEditForm />
        </main>
      </div>
    </div>
  );
};
