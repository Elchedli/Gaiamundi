import NewMapForm from 'components/Forms/NewMapForm';

export const NewMapPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex justify-center">
        <h2 className="mt-10 text-3xl font-extrabold text-blue-700">
          Nouvelle PageCarto
        </h2>
      </div>
      <div className="mx-4 lg:mx-8 mt-8 flex justify-center">
        <div className="w-fit lg:w-3/5 px-4 py-8 mt-8 bg-white rounded-lg shadow-lg sm:px-10">
          <NewMapForm />
        </div>
      </div>
    </div>
  );
};
