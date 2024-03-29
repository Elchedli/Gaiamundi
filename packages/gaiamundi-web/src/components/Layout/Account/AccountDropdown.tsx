import { Transition } from '@headlessui/react';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import { useOnClickOutside } from 'hooks/useClickOutside';
import { useToast } from 'hooks/useToast';
import { AccountAvatar } from './AccountAvatar';

type AccountDropdownItemProps = {
  href?: string;
  title: string;
  onClick?: () => void;
};

export const AccountDropdownItem: React.FC<AccountDropdownItemProps> = ({
  href,
  title,
  onClick,
}) => {
  return (
    <Link
      to={href || '#'}
      onClick={onClick}
      className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    >
      {title}
    </Link>
  );
};

export const AccountDropdown: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dropdownNode = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { addToast } = useToast();

  useOnClickOutside(dropdownNode, () => setDropdownOpen(false));

  const handleSignOut = async () => {
    try {
      logout();
      addToast({
        title: 'Until next time!👋',
        description: 'You are successfully signed out.',
        type: 'success',
      });
      navigate('/');
    } catch (err) {
      addToast({
        title: 'Something went wrong!',
        description: 'Please try again later.',
        type: 'error',
      });
    }
  };

  return (
    <div className="flex items-center ml-4 md:ml-6">
      <div className="relative ml-3" ref={dropdownNode}>
        <AccountAvatar onClick={() => setDropdownOpen(!dropdownOpen)} />
        <Transition
          show={dropdownOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="absolute right-0 w-48 mt-2 origin-top-right rounded-lg shadow-xl">
            <div className="py-1 bg-white rounded shadow-xs">
              <AccountDropdownItem
                href={'/dashboard'}
                title={'Tableau de bord'}
              />
              <AccountDropdownItem href={'/account'} title={'Mon compte'} />
              <AccountDropdownItem
                href={'/'}
                title={'Déconnexion'}
                onClick={handleSignOut}
              />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};
