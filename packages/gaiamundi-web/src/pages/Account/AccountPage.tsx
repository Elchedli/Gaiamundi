import { Link } from 'react-router-dom';

import { useRequireAuth } from 'hooks/useRequireAuth';
import { Button } from 'components/Button/Button';
import { Header } from 'components/Layout/Header';

export const AccountPage: React.FC = () => {
  const { user } = useRequireAuth();

  if (!user) return null;

  return (
    <div>
      <Header>Compte</Header>
      <div className="flex">
        <main className="w-2/3 mx-auto overflow-hidden bg-white rounded shadow block">
          <div className="px-4 py-5 pt-5 mt-5 p-6">
            <dl>
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium leading-5 text-gray-600">
                  Nom d&apos;utilisateur
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 mt-0 col-span-2">
                  {user.username}
                </dd>
              </div>
              <div className="mt-8 grid mt-5 grid-cols-3 gap-4 border-t border-gray-200 pt-5">
                <dt className="text-sm font-medium leading-5 text-gray-600">
                  Email
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 mt-0 col-span-2">
                  {user.email}
                </dd>
              </div>
              <div className="mt-8 grid mt-5 grid-cols-3 gap-4 border-t border-gray-200 pt-5">
                <dt className="text-sm font-medium leading-5 text-gray-600">
                  Confirmé ?
                </dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900 mt-0 col-span-2">
                  {user.confirmed ? 'Oui' : 'Non'}
                </dd>
              </div>
            </dl>
            <div className="pt-5 mt-8 border-t border-gray-200">
              <div className="flex justify-end">
                <Link to="/account/edit">
                  <Button>Mettre à jour</Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
