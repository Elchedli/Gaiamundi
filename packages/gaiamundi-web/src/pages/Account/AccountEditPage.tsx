import { Header } from 'components/Layout/Header';
import { AccountEditForm } from 'components/User/AccountEditForm';
import { useRequireAuth } from 'hooks/useRequireAuth';

export const AccountEditPage: React.FC = () => {
  const { user } = useRequireAuth();

  if (!user) return null;

  return (
    <div>
      <Header>Modifier mon compte</Header>
      <div className="flex">
        <main className="w-2/3 px-5 py-6 mx-auto bg-white rounded-lg shadow-lg">
          <AccountEditForm />
        </main>
      </div>
    </div>
  );
};
