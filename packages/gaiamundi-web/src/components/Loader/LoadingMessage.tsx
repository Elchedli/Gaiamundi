import LoadingSpinner from 'components/Icons/LoadingSpinner';

interface LoadingMessageProps {
  label?: string;
  dataTestId?: string;
}

export const LoadingMessage = ({
  label = 'Loading ...',
  dataTestId = 'loading-message',
}: LoadingMessageProps): JSX.Element => {
  return (
    <div
      className="flex grow justify-center items-center"
      data-testid={dataTestId}
    >
      <div className="flex flex-col">
        <LoadingSpinner fill="#88CDD3" width="100" className="m-auto" />
        <h1 className="text-center text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};
