import { render, fireEvent } from '@testing-library/react';
import { Popover } from '../Popover';
import { mockGeoMapData } from 'utils/mocks/data';

describe('Popover', () => {
  it('should toggle visibility on button click', () => {
    const { getByTestId, queryByRole } = render(
      <Popover properties={mockGeoMapData.properties} />
    );
    const button = getByTestId('button');
    fireEvent.click(button);
    expect(queryByRole('tooltip')).toBeInTheDocument();
    fireEvent.click(button);
    expect(queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('should render the tooltip with the correct data', () => {
    const { getByTestId, getByText } = render(
      <Popover properties={mockGeoMapData.properties} />
    );
    const button = getByTestId('button');
    fireEvent.click(button);
    expect(getByText('properties')).toBeInTheDocument();
    expect(getByText(mockGeoMapData.properties[0].name)).toBeInTheDocument();
    expect(getByText('Code Géographie')).toBeInTheDocument();
    expect(getByText(mockGeoMapData.properties[0].sample)).toBeInTheDocument();
  });
});
