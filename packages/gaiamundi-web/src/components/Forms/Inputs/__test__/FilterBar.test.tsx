import { fireEvent, render } from '@testing-library/react';
import { FilterBar } from 'components/PageCartoUser/FilterBar';
import { ApiData } from 'interfaces/api';
import { Tag } from 'interfaces/page-carto';
const tags: ApiData<Tag>[] = [
  {
    id: 1,
    attributes: {
      id: 1,
      type: 'Géographique',
      name: 'Tag A',
      count: 5,
      created_at: '2022-02-07T00:00:00.000Z',
      updated_at: '2022-02-07T00:00:00.000Z',
    },
  },
  {
    id: 2,
    attributes: {
      id: 2,
      type: 'Géographique',
      name: 'Tag B',
      count: 3,
      created_at: '2022-02-07T00:00:00.000Z',
      updated_at: '2022-02-07T00:00:00.000Z',
    },
  },
  {
    id: 3,
    attributes: {
      id: 3,
      type: 'Thématique',
      name: 'Tag C',
      count: 2,
      created_at: '2022-02-07T00:00:00.000Z',
      updated_at: '2022-02-07T00:00:00.000Z',
    },
  },
];

const props = {
  onSearchKeywordChange: jest.fn(),
  onTagChange: jest.fn(),
  tags,
};

describe('FilterBar', () => {
  test('renders without error', () => {
    render(<FilterBar {...props} />);
  });
  test('passes onSearchKeywordChange prop', async () => {
    const { getByPlaceholderText } = render(<FilterBar {...props} />);
    const input = getByPlaceholderText('Recherche ...');
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'Yes' } });
    await new Promise((r) => setTimeout(r, 500));
    expect(props.onSearchKeywordChange).toHaveBeenCalled();
  });

  test('passes onTagChange prop', () => {
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
