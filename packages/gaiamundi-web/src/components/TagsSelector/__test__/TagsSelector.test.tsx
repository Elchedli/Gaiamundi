import { fireEvent, render } from '@testing-library/react';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mockTags, mockUser } from 'utils/mocks/data';
import { TagsSelector } from '../TagsSelector';

const [firstTag, secondTag] = mockTags;

jest.mock('hooks/useAuth');
jest.mock('react-query');

describe('TagsSelector', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: mockUser,
    }));
  });
  it('should render without error', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [firstTag, secondTag] },
    }));
    render(<TagsSelector onChange={jest.fn()} />);
  });
  it('should return the loading message', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [] },
      isError: false,
      error: null,
      isLoading: true,
    }));
    const { getByTestId } = render(<TagsSelector onChange={jest.fn()} />);
    const loadingMessage = getByTestId('tags-loading-message');
    expect(loadingMessage).toBeInTheDocument();
  });
  it('should return the error message', () => {
    const mockError = {
      message: 'An error occurred',
      statusCode: 500,
    };
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [] },
      isError: true,
      error: mockError,
      isLoading: false,
    }));
    const { getByTestId } = render(<TagsSelector onChange={jest.fn()} />);
    const errorMessage = getByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
  });
  it('should handle empty data', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [] },
      isError: false,
      error: null,
      isLoading: false,
    }));
    const { getByTestId } = render(<TagsSelector onChange={jest.fn()} />);
    const emptyMessage = getByTestId('empty-message');
    expect(emptyMessage).toBeInTheDocument();
  });
  it('should return the tags from API and show the tags filter div', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [firstTag, secondTag] },
      isError: false,
      error: null,
      isLoading: false,
    }));
    const { getByTestId, getByText } = render(
      <TagsSelector onChange={jest.fn()} />
    );
    const AutoCompleteInput = getByTestId('input');
    fireEvent.change(AutoCompleteInput, { target: { value: 'a' } });
    const TagA = getByText('Tag A');
    const TagB = getByText('Tag B');
    expect(TagA).toBeInTheDocument();
    expect(TagB).toBeInTheDocument();
  });

  it('should select the tag onclick', () => {
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [firstTag] },
      isError: false,
      error: null,
      isLoading: false,
    }));
    const { getByTestId, getByRole } = render(
      <TagsSelector onChange={jest.fn()} />
    );
    const AutoCompleteInput = getByTestId('input');
    fireEvent.change(AutoCompleteInput, { target: { value: 'a' } });
    fireEvent.click(getByRole('option'));
    const selectedTags = getByTestId('selected-tags');
    expect(selectedTags).toBeInTheDocument();
  });
});
