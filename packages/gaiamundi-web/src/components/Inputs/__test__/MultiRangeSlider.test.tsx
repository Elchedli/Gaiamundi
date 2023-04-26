import { act, fireEvent, render } from '@testing-library/react';
import MultiRangeSlider from '../MultiRangeSlider';

describe('MultiRangeSlider', () => {
  it('should render the multi range slider', async () => {
    const { getByTestId } = render(
      <MultiRangeSlider min={0} max={100} onChange={jest.fn()} />
    );

    expect(getByTestId('multi-range-slider')).toBeInTheDocument();
  });

  it('should set the slider min/max values', async () => {
    const { getByTestId, getByText } = render(
      <MultiRangeSlider min={0} max={100} onChange={jest.fn()} />
    );

    const minValSlider = getByTestId('min-value-slider');
    const maxValSlider = getByTestId('max-value-slider');

    expect(minValSlider).toBeInTheDocument();
    expect(minValSlider).toBeInTheDocument();

    act(() => {
      fireEvent.change(minValSlider, { target: { value: 30 } });
      fireEvent.change(maxValSlider, { target: { value: 70 } });
    });

    // verify min value slider
    expect(minValSlider).toHaveValue('30');

    // verify max value slider
    expect(maxValSlider).toHaveValue('70');

    // verify that min and max values are shown
    expect(getByText('30')).toBeInTheDocument();
    expect(getByText('70')).toBeInTheDocument();
  });
});
