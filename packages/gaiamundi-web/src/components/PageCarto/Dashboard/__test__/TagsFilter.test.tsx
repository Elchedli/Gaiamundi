import { fireEvent, render } from '@testing-library/react';
import { TagsFilter } from 'components/PageCarto/Dashboard/TagsFilter';
import { mockTags } from 'utils/mocks/data';

const [firstTag, secondTag] = mockTags;

describe('TagsFilter', () => {
  it('displays tags grouped by type', () => {
    const { getByText } = render(
      <TagsFilter onChange={jest.fn()} tags={mockTags} />
    );

    mockTags.forEach((tag) => {
      expect(getByText(tag.name)).toBeInTheDocument();
    });
  });

  it('adds and removes selected tags', async () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <TagsFilter onChange={onChange} tags={mockTags} />
    );

    fireEvent.click(getByText(firstTag.name));
    expect(onChange).toHaveBeenCalledWith([firstTag.id]);

    fireEvent.click(getByText(secondTag.name));
    expect(onChange).toHaveBeenCalledWith([firstTag.id, secondTag.id]);

    fireEvent.click(getByText(firstTag.name));
    expect(onChange).toHaveBeenCalledWith([secondTag.id]);
  });

  it('displays selected tags and allows them to be removed', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <TagsFilter onChange={onChange} tags={mockTags} />
    );

    const tag1 = getByText(firstTag.name);

    fireEvent.click(tag1);

    const selectedTagA = getByText(firstTag.name);

    expect(selectedTagA).toBeInTheDocument();

    fireEvent.click(selectedTagA);

    expect(onChange).toHaveBeenCalledWith([]);
    expect(selectedTagA).not.toBeInTheDocument();
  });

  it('resets selection when "Effacer tout" button is clicked (add and remove must work)', async () => {
    const onChange = jest.fn();

    const { getByText, getByTestId } = render(
      <TagsFilter onChange={onChange} tags={mockTags} />
    );

    const selectedTags = getByTestId('selected-tags-filter');

    expect(selectedTags.children).toHaveLength(0);

    fireEvent.click(getByText(firstTag.name));
    fireEvent.click(getByText(secondTag.name));

    expect(selectedTags.children).toHaveLength(2);

    fireEvent.click(getByTestId('clear-tags-filter'));

    expect(onChange).toHaveBeenCalledWith([]);
    expect(selectedTags.children).toHaveLength(0);
  });
});
