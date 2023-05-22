import { useAuth } from 'hooks/useAuth';
import Avatar from 'react-avatar';

type AccountAvatarProps = {
  onClick?: () => void;
};

const AccountAvatar: React.FC<AccountAvatarProps> = ({ onClick }) => {
  const { user } = useAuth();

  return (
    <button
      onClick={onClick}
      className="flex items-center max-w-xs text-sm text-white rounded-full focus:outline-none focus:shadow-solid"
    >
      <span className="flex items-center justify-center overflow-hidden bg-gray-200 rounded-full w-12 h-12">
        {user?.Avatar ? (
          <img
            className="object-cover object-fit w-full h-full rounded"
            src={user.Avatar.url}
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
