import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockGeoMapData } from 'utils/mocks/data';
import { MockedResizeObserver } from 'utils/mocks/resize-observer';
import { GeoMapPopover } from '../GeoMapPopover';

describe('GeoMapPopover', () => {
  window.ResizeObserver = MockedResizeObserver;
  it('should toggle visibility on button click', async () => {
    const { getByTestId } = render(
      <GeoMapPopover properties={mockGeoMapData.properties} />
    );
    const popover = getByTestId('tooltip-target');

    await userEvent.click(popover);

    expect(getByTestId('tooltip')).not.toHaveClass('invisible');
  });

  it('should render the tooltip with the correct data', async () => {
    const { getByTestId } = render(
      <GeoMapPopover properties={mockGeoMapData.properties} />
    );
    const popover = getByTestId('tooltip-target');

    userEvent.click(popover);

    expect(getByTestId('property-title')).toBeInTheDocument();
    expect(getByTestId('property-name')).toHaveTextContent(
      mockGeoMapData.properties[0].name
    );
    expect(getByTestId('property-value')).toHaveTextContent(
      mockGeoMapData.properties[0].sample
    );
  });
});
