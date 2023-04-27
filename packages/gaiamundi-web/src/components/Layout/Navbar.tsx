import { PlusIcon } from '@heroicons/react/24/solid';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import classNames from 'classnames';
import { Button } from 'components/Button/Button';
import { AccountDropdown } from 'components/Layout/Account/AccountDropdown';
import { useAuth } from 'hooks/useAuth';
import { LogoLink } from './LogoLink';

const NavbarMenuItem: React.FC<{
  href: string;
  title: string;
  isInverted: boolean;
}> = ({ href, title, isInverted = false }) => {
  const location = useLocation();
  const isCurrentPage = location.pathname === href;
  const lightClasses = {
    active: `text-blue-900 bg-blue-200 focus:text-blue-600`,
    inactive: `text-blue-600 hover:text-blue-900 hover:bg-blue-100 focus:outline-none`,
  };
  const darkClasses = {
    active: `text-white bg-royal-blue-800 focus:text-white`,
    inactive: `text-blue-100 hover:text-white hover:bg-royal-blue-800 focus:outline-none`,
  };
  const classes = isInverted ? darkClasses : lightClasses;
  return (
    <Link
      to={href}
      className={`mr-4 px-3 py-2 rounded text-sm font-medium focus:outline-none ${
        isCurrentPage ? classes.active : classes.inactive
      }`}
    >
      {title}
    </Link>
  );
};

export const libMenuItems = [
  { title: 'Démarrer', href: '#' },
  { title: 'Documentation', href: '#' },
  { title: 'Cartes', href: '#' },
  { title: 'Blog', href: '#' },
];

const loggedInMenuItems = [
  { title: 'Tableau de bord', href: '/dashboard' },
  { title: 'Compte', href: '/account' },
];

const anonymousMenuItems = [
  { title: 'Fonctionnalités', href: '/#features' },
  { title: 'Documentation', href: '/#docs' },
  { title: 'Equipe', href: '/#team' },
  { title: 'Blog', href: '/blog' },
];

const AuthSidebarMenu = (): JSX.Element => {
  return (
    <div data-testid="login-buttons">
      <Link to="/login">
        <Button
          color="lime"
          outline={false}
          size="md"
          className="inline-flex mx-1"
        >
          Se connecter
        </Button>
      </Link>
      <Link to="/signup">
        <Button
          gradientMonochrome="blue"
          outline={false}
          size="md"
          className="inline-flex mx-1"
        >
          Créer un compte
        </Button>
      </Link>
    </div>
  );
};

const NavbarMenu: React.FC<{ isInverted: boolean }> = ({ isInverted }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const menuItems =
    isAuthenticated && !isHomePage ? loggedInMenuItems : anonymousMenuItems;
  return (
    <div data-testid="navigations" className="flex items-baseline ml-10">
      {menuItems.map(({ title, href }) => {
        return (
          <NavbarMenuItem
            key={title}
            href={href}
            title={title}
            isInverted={isInverted}
          />
        );
      })}
    </div>
  );
};

const SideNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isAppPage = location.pathname.startsWith('/app');
  return (
    <div className="flex flex-row items-center hidden md:flex">
      {!isAppPage && (
        <div className="flex flex-row">
          <Button
            outline={false}
            size="md"
            className="inline-flex mx-1"
            color={'lime'}
            icon={PlusIcon}
            data-testid="newPageCarto-button"
            onClick={() => navigate('/page-carto/create')}
          >
            Nouvelle PageCarto
          </Button>
          <Button
            outline={false}
            size="md"
            className="inline-flex mx-1"
            color={'blue'}
            onClick={() => logout()}
          >
            Déconnexion
          </Button>
        </div>
      )}
      <AccountDropdown />
    </div>
  );
};

type NavbarProps = {
  isFluid?: boolean;
  isInverted?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({
  isFluid = false,
  isInverted = false,
}) => {
  const { isAuthenticated } = useAuth();
  return (
    <nav
      className={classNames(
        isFluid ? 'w-full' : '',
        isInverted ? 'bg-royal-blue-900 text-gray-700 body-font' : 'bg-white',
        'shadow-md z-10'
      )}
    >
      <div className={`sm:px-6 lg:px-8 ${!isFluid && 'mx-auto max-w-7xl'}`}>
        <div className="">
          <div className="flex items-center justify-between h-16 px-4 sm:px-0">
            <div className="flex items-center">
              <LogoLink isInverted={isInverted} />
              <NavbarMenu isInverted={isInverted} />
            </div>
            {isAuthenticated ? <SideNavigation /> : <AuthSidebarMenu />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
