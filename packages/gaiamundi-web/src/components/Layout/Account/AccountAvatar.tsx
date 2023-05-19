import { useAuth } from 'hooks/useAuth';
import Avatar from 'react-avatar';

type AccountAvatarProps = {
  size?: 'md' | 'lg';
  onClick?: () => void;
};

const AccountAvatar: React.FC<AccountAvatarProps> = ({
  size = 'md',
  onClick,
}) => {
  const { user } = useAuth();
  const avatarSize = size === 'md' ? 8 : 12;

  return (
    <button
      onClick={onClick}
      className="flex items-center max-w-xs text-sm text-white rounded-full focus:outline-none focus:shadow-solid"
    >
      <span
        className={`inline-block w-${avatarSize} h-${avatarSize} overflow-hidden bg-gray-200 rounded-full`}
      >
        {user?.Avatar ? (
          <img
            className="object-cover w-full h-full rounded"
            src={user.Avatar?.url}
            alt={user.username}
          />
        ) : (
          <Avatar name={user?.username || 'User'} round={true} />
        )}
      </span>
    </button>
  );
};

export default AccountAvatar;
