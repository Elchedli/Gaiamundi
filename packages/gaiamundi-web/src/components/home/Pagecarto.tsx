import PageCartoItem from './PageCartoItem';

const PageCarto = () => {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="my-6 text-3xl font-extrabold text-left text-gray-900">
        {'Dernières PageCartos publiées'}
      </h2>

      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
        {Array(4)
          .fill(0)
          .map((item) => (
            <PageCartoItem
              key={item}
              name={'12'}
              owner={item}
              description={
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
              }
            />
          ))}
      </div>
    </div>
  );
};

export default PageCarto;
