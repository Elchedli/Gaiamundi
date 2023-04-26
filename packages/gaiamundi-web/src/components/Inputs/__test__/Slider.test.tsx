import { act, fireEvent, render } from '@testing-library/react';
import { Slider } from '../Slider';

describe('Slider', () => {
  it('should render a slider', async () => {
    const { getByTestId } = render(
      <Slider defaultValue={0} onChange={jest.fn()} />
    );

    expect(getByTestId('slider')).toBeInTheDocument();
  });

  it('should set the slider value using the text input', async () => {
    const { getByTestId } = render(
      <Slider defaultValue={0} onChange={jest.fn()} />
    );

    const textInput = getByTestId('slider-text-input');
    const slider = getByTestId('slider');

    expect(slider).toBeInTheDocument();
    //set value through text input
    act(() => {
      fireEvent.change(textInput, { target: { value: 50 } });
    });

    // verify text input value
    expect(textInput).toHaveValue('50');

    // verify slider input value
    expect(slider).toHaveValue('50');

    // set value through slider
    act(() => {
      fireEvent.change(slider, { target: { value: 20 } });
    });

    // verify text input value
    expect(textInput).toHaveValue('20');

    // verify slider input value
    expect(slider).toHaveValue('20');
  });
});
