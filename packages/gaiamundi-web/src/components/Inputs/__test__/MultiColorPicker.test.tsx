import { act, fireEvent, render } from '@testing-library/react';
import { MultiColorPicker } from '../MultiColorPicker';

describe('MultiColorPicker', () => {
  it('should render the picker component but not the color picker itself', async () => {
    const { getByTestId, queryByTestId } = render(
      <MultiColorPicker
        defaultColors={['rgb(213, 50, 16, 0.2)']}
        onChange={jest.fn()}
      />
    );

    expect(getByTestId('color-picker0')).toBeInTheDocument();
    expect(queryByTestId('color-picker')).toBeNull;
  });

  it('should render a color picker', async () => {
    const { getByTestId } = render(
      <MultiColorPicker
        defaultColors={['rgb(213, 50, 16, 0.2)']}
        onChange={jest.fn()}
      />
    );

    const colorPickerSquare = getByTestId('color-picker-square');

    await act(() => {
      fireEvent.click(colorPickerSquare);
    });

    expect(getByTestId('color-picker-square')).toBeInTheDocument();
    expect(getByTestId('color-picker')).toBeInTheDocument();
  });

  it('should render multipe color pickers', async () => {
    const colors = ['rgb(213, 50, 16, 0.2)', 'rgb(90, 29, 17, 0.2)'];

    const { getByTestId } = render(
      <MultiColorPicker defaultColors={colors} onChange={jest.fn()} />
    );

    expect(getByTestId('color-picker0')).toBeInTheDocument();
    expect(getByTestId('color-picker1')).toBeInTheDocument();
  });
  it('should add another color picker', async () => {
    const colors = ['rgb(213, 50, 16, 0.2)', 'rgb(90, 29, 17, 0.2)'];

    const { getByTestId } = render(
      <MultiColorPicker defaultColors={colors} onChange={jest.fn()} />
    );

    const addButton = getByTestId('add-color-picker-button');
    expect(getByTestId('color-picker0')).toBeInTheDocument();
    expect(getByTestId('color-picker1')).toBeInTheDocument();
    await act(() => {
      fireEvent.click(addButton);
    });

    expect(getByTestId('color-picker2')).toBeInTheDocument();
  });
});
