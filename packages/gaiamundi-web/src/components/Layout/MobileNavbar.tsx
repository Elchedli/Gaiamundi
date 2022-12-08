import { Link, useLocation } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import { useToast } from 'hooks/useToast';
import { AccountAvatar } from 'components/Account/AccountAvatar';

const MobileNavbarItem: React.FC<{
  href: string;
  title: string;
  setIsMobileNavbarOpen: (open: boolean) => void;
}> = ({ href, title, setIsMobileNavbarOpen }) => {
  const location = useLocation();
  const isCurrentRoute = location.pathname === href;
  return (
    <Link
      to={href}
      onClick={() => {
        if (isCurrentRoute) {
          setIsMobileNavbarOpen(false);
        }
      }}
      className={`block px-3 py-2 rounded text-base font-medium focus:outline-none focus:text-white focus:bg-gray-100 ${
        isCurrentRoute
          ? 'text-gray-900 bg-gray-200'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {title}
    </Link>
  );
};

export const MobileNavbar: React.FC<{
  isOpen: boolean;
  setIsMobileNavbarOpen: (open: boolean) => void;
}> = ({ isOpen = false, setIsMobileNavbarOpen }) => {
  const { isAuthenticated, user, signOut } = useAuth();
  const { addToast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      addToast({
        title: 'Until next time!👋',
        description: 'You are successfully signed out.',
        type: 'success',
      });
    } catch (_err) {
      addToast({
        title: 'Unable to sign you out!',
        description: 'Please try again later ...',
        type: 'error',
      });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="block border-b border-gray-200 md:hidden">
      <div className="px-2 py-3 sm:px-3">
        <MobileNavbarItem
          href={'/'}
          title={'Accueil'}
          setIsMobileNavbarOpen={setIsMobileNavbarOpen}
        />
      </div>
      <div className="pt-4 pb-3 border-t border-gray-200">
        {isAuthenticated && user ? (
          <>
            <div className="flex items-center px-5">
              <AccountAvatar size={'lg'} />
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {user.username}
                </div>
                <div className="mt-1 text-sm font-medium leading-none text-gray-600">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="px-2 mt-3">
              <a
                href="/#"
                className="block px-3 py-2 mt-1 text-base font-medium text-gray-600 rounded hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:text-white focus:bg-gray-100"
                onClick={handleSignOut}
              >
                Sign out
              </a>
            </div>
          </>
        ) : (
          <div className="px-2 mt-3">
            <MobileNavbarItem
              href={'/login'}
              title={'Se connecter'}
              setIsMobileNavbarOpen={setIsMobileNavbarOpen}
            />
            <MobileNavbarItem
              href={'/signup'}
              title={'Créer un compte'}
              setIsMobileNavbarOpen={setIsMobileNavbarOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
};
