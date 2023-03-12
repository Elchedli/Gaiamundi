import { fireEvent, render } from '@testing-library/react';
import { TagsFilter } from 'components/PageCarto/Dashboard/TagsFilter';
import { mockTags } from 'utils/mocks/data';

describe('TagsFilter', () => {
  it('displays tags grouped by type', () => {
    const { getByText } = render(
      <TagsFilter onChange={jest.fn()} tags={mockTags} />
    );
    const typeALabel = getByText('Géographique');
    const tagA = getByText('Tag A');
    const tagB = getByText('Tag B');
    const typeBLabel = getByText('Thématique');
    const tagC = getByText('Tag C');
    expect(typeALabel).toBeInTheDocument();
    expect(tagA).toBeInTheDocument();
    expect(tagB).toBeInTheDocument();
    expect(typeBLabel).toBeInTheDocument();
    expect(tagC).toBeInTheDocument();
  });

  it('adds and removes selected tags', async () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <TagsFilter onChange={onChange} tags={mockTags} />
    );
    fireEvent.click(getByText('Tag A'));
    expect(onChange).toHaveBeenCalledWith([1]);
    fireEvent.click(getByText('Tag B'));
    expect(onChange).toHaveBeenCalledWith([1, 2]);
    fireEvent.click(getByText('Tag A'));
    expect(onChange).toHaveBeenCalledWith([2]);
  });

  it('displays selected tags and allows them to be removed', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <TagsFilter onChange={onChange} tags={mockTags} />
    );
    const tagA = getByText('Tag A');
    fireEvent.click(tagA);
    const selectedTagA = getByText('Tag A');
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
    fireEvent.click(getByText('Tag A'));
    fireEvent.click(getByText('Tag B'));
    expect(getByText('Tag A')).not.toContainHTML('class');
    expect(getByText('Tag B')).not.toContainHTML('class');
    fireEvent.click(getByText('Effacer tout'));
    expect(onChange).toHaveBeenCalledWith([]);
    expect(getByText('Tag A')).toContainHTML('class');
    expect(getByText('Tag B')).toContainHTML('class');
  });
});
