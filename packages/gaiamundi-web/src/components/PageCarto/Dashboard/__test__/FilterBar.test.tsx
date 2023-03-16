import { fireEvent, render } from '@testing-library/react';
import { FilterBar } from 'components/PageCarto/Dashboard/FilterBar';
import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'react-query';
import { mockTags, mockUser } from 'utils/mocks/data';

const props = {
  onSearchKeywordChange: jest.fn(),
  onTagChange: jest.fn(),
};

jest.mock('hooks/useAuth');
jest.mock('react-query');

describe('FilterBar', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockImplementation(() => ({
      isAuthenticated: true,
      user: mockUser,
    }));
    (useQuery as jest.Mock).mockImplementation(() => ({
      data: { data: [...mockTags] },
    }));
  });

  test('should render without error', () => {
    render(<FilterBar {...props} />);
  });

  test('should pass the onSearchKeywordChange prop', async () => {
    const { getByPlaceholderText } = render(<FilterBar {...props} />);
    const input = getByPlaceholderText('Recherche ...');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'Yes' } });
    await new Promise((r) => setTimeout(r, 500));
    expect(props.onSearchKeywordChange).toHaveBeenCalled();
  });

  test('should pass the onTagChange prop', () => {
    const { getByText } = render(<FilterBar {...props} />);
    const tag1 = getByText('Tag A');
    const tag2 = getByText('Tag B');
    expect(tag1).toBeInTheDocument();
    expect(tag2).toBeInTheDocument();
    getByText('Tag A').click();
    fireEvent.click(getByText('Tag A'));
    fireEvent.click(getByText('Tag B'));
    expect(props.onTagChange).toHaveBeenCalledWith([1, 2]);
  });
});
