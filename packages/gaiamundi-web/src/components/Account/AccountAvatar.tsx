import Avatar from 'components/Icons/Avatar';

type AccountAvatarProps = {
  size?: 'md' | 'lg';
  onClick?: () => void;
};

export const AccountAvatar: React.FC<AccountAvatarProps> = ({
  size = 'md',
  onClick,
}) => {
  // const { user } = useAuth();
  const avatarSize = size === 'md' ? 8 : 12;
  return (
    <button
      onClick={onClick}
      className="flex items-center max-w-xs text-sm text-white rounded-full focus:outline-none focus:shadow-solid"
    >
      <span
        className={`inline-block w-${avatarSize} h-${avatarSize} overflow-hidden bg-gray-200 rounded-full`}
      >
        {/* {user?.avatarUrl ? (
          <img
            className="object-cover w-full h-full rounded"
            src={user.avatarUrl}
            alt={user.name}
          />
        ) : ( */}
        <Avatar className={`w-${avatarSize} h-${avatarSize}`} />
        {/* )} */}
      </span>
    </button>
  );
};
