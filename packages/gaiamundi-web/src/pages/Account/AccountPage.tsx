import { Button } from 'components/Button/Button';
import { Header } from 'components/Layout/Header';
import ProfilePhotoUpload from 'components/ProfilePhotoUpload/ProfilePhotoUpload';
import { useRequireAuth } from 'hooks/useRequireAuth';
import { Link } from 'react-router-dom';

export const AccountPage: React.FC = () => {
  const { user } = useRequireAuth();

  if (!user) return null;

  return (
    <div>
      <Header>Compte</Header>
      <div className="flex">
        <main className="w-2/3 mx-auto rounded shadow">
          <div className="px-4 py-5 pt-5 mt-5 p-6">
            <dl>
              <div className="grid grid-cols-3 gap-4">
                <dt className="text-sm font-medium leading-5 text-gray-600">
                  Nom d&apos;utilisateur
                </dt>
                <dd className="text-sm leading-5 text-gray-900 col-span-2">
                  {user.username}
                </dd>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-5">
                <dt className="text-sm font-medium leading-5 text-gray-600">
                  Email
                </dt>
                <dd className="text-sm leading-5 text-gray-900 col-span-2">
                  {user.email}
                </dd>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-5">
                <dt className="text-sm font-medium leading-5 text-gray-600">
                  Confirmé ?
                </dt>
                <dd className="text-sm leading-5 text-gray-900 col-span-2">
                  {user.confirmed ? 'Oui' : 'Non'}
                </dd>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-5">
                <dt className="text-sm font-medium leading-5 text-gray-600">
                  Photo de profil
                </dt>
                <dd className="text-sm leading-5 text-gray-900 col-span-2">
                  <ProfilePhotoUpload />
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
