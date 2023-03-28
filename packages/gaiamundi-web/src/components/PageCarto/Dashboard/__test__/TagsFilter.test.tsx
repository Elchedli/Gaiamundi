import { fireEvent, render } from '@testing-library/react';
import { TagsFilter } from 'components/PageCarto/Dashboard/TagsFilter';
import { mockTags } from 'utils/mocks/data';

const types = ['Géographique', 'Thématique'];
const [tagA, tagB] = [mockTags[0].name, mockTags[1].name];
describe('TagsFilter', () => {
  it('displays tags grouped by type', () => {
    const { getByText } = render(
      <TagsFilter onChange={jest.fn()} tags={mockTags} />
    );

    types.forEach((type) => {
      expect(getByText(type)).toBeInTheDocument();
    });
    mockTags.forEach((tag) => {
      expect(getByText(tag.name)).toBeInTheDocument();
    });
  });

  it('adds and removes selected tags', async () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <TagsFilter onChange={onChange} tags={mockTags} />
    );

    fireEvent.click(getByText(tagA));
    expect(onChange).toHaveBeenCalledWith([1]);

    fireEvent.click(getByText(tagB));
    expect(onChange).toHaveBeenCalledWith([1, 2]);

    fireEvent.click(getByText(tagA));
    expect(onChange).toHaveBeenCalledWith([2]);
  });

  it('displays selected tags and allows them to be removed', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <TagsFilter onChange={onChange} tags={mockTags} />
    );

    const tag1 = getByText(tagA);
    fireEvent.click(tag1);

    const selectedTagA = getByText(tagA);

    expect(selectedTagA).toBeInTheDocument();

    fireEvent.click(selectedTagA);

    expect(onChange).toHaveBeenCalledWith([]);
    expect(selectedTagA).not.toBeInTheDocument();
  });

  it('resets selection when "Effacer tout" button is clicked (add and remove must work)', () => {
    const onChange = jest.fn();

    const { getByText } = render(
      <TagsFilter onChange={onChange} tags={mockTags} />
    );

    fireEvent.click(getByText(tagA));
    fireEvent.click(getByText(tagB));

    expect(getByText(tagA)).not.toContainHTML('class');
    expect(getByText(tagB)).not.toContainHTML('class');

    fireEvent.click(getByText('Effacer tout'));

    expect(onChange).toHaveBeenCalledWith([]);
    expect(getByText(tagA)).toContainHTML('class');
    expect(getByText(tagB)).toContainHTML('class');
  });
});
