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

  // test('should pass the onTagChange prop', () => {
  //   const { container, getByText, getByTestId, getAllByTestId } = render(
  //     <FilterBar {...props} />
  //   );

  //   const unfiltered = Array.prototype.reduce.call(
  //     getAllByTestId('unfiltered-tags'),
  //     (acc, node: HTMLElement) => {
  //       return acc.concat(Array.from(node.childNodes));
  //     },
  //     []
  //   );

  //   expect(unfiltered).toHaveLength(mockTags.length);
  //   unfiltered.forEach((element, index) => {
  //     expect(element).toContainHTML(mockTags[index].name);
  //     fireEvent.click(element);
  //   });

  //   expect(filtered).toHaveLength(0);

  //   const tag2 = getByText(mockTags[1].name);
  //   expect(tag1).toBeInTheDocument();
  //   expect(tag2).toBeInTheDocument();

  //   // expect(container).toMatchSnapshot();

  //   fireEvent.click(getByText('Tag A'));
  //   fireEvent.click(getByText('Tag B'));

  //   expect(container.contains(tag1)).not.toBeTruthy();
  //   expect(container.contains(tag2)).not.toBeTruthy();
  //   fireEvent.click(getByText('Tag A'));
  //   expect(props.onTagChange).toHaveBeenCalledWith([1, 2]);
  // });
});
