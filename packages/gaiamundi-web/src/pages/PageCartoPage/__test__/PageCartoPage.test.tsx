import { render, screen } from '@testing-library/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getPageCartoById } from 'services/page-carto';
import { mockPageCartoApiDocument } from 'utils/mocks/data';
import { mockMapPath, mockMapReal } from 'utils/mocks/map';
import { PageCartoEditPage } from '../PageCartoPage';

jest.mock('react-query', () => ({
  useQuery: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

describe('PageCartoEditPage', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: 123 });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render loading message while query is in progress', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(<PageCartoEditPage />);
    expect(screen.getByText('Loading ...')).toBeInTheDocument();
    expect(useParams).toHaveBeenCalled();
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['page-carto', 123],
      queryFn: expect.any(Function),
      keepPreviousData: true,
      enabled: true,
    });
    expect(getPageCartoById).toHaveBeenCalledWith(123);
  });

  it('should render error alert when there is an error', async () => {
    const error = { message: 'Something went wrong' };
    (useQuery as jest.Mock).mockReturnValue({
      isError: true,
      error,
    });

    render(<PageCartoEditPage />);

    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(useParams).toHaveBeenCalled();
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['page-carto', 123],
      queryFn: expect.any(Function),
      keepPreviousData: true,
      enabled: true,
    });
    expect(getPageCartoById).toHaveBeenCalledWith(123);
  });

  it('should render page carto editor when there is a response', async () => {
    (useQuery as jest.Mock)
      .mockImplementationOnce(() => {
        // Mock implementation for first query key
        return { data: mockMapReal };
      })
      .mockImplementation((props: any) => {
        return props.queryKey[0] == 'geoJSON' && { data: { ...mockMapPath } };
      });

    const { container } = render(<PageCartoEditPage />);

    expect(container.querySelector('.col-span')?.className).toBeTruthy();
    expect(useParams).toHaveBeenCalled();
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['page-carto', 123],
      queryFn: expect.any(Function),
      keepPreviousData: true,
      enabled: true,
    });
    expect(getPageCartoById).toHaveBeenCalledWith(123);
    expect(
      screen.getByText(mockPageCartoApiDocument.data.attributes.name)
    ).toBeInTheDocument();
  });
});
