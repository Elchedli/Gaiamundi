import MapForm from 'components/Forms/MapForm';

export const NouvelleCarte: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="mx-4 mt-8 sm:w-full sm:max-w-md">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Nouvelle PageCarto
          </h2>
        </div>
        <div className="px-4 py-8 mt-8 bg-white rounded-lg shadow-lg sm:px-10">
          <MapForm />
        </div>
      </div>
    </div>
  );
};
