import { act, fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import { ColorPicker } from '../ColorPicker';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('ColorPicker', () => {
  const setColor = jest.fn();
  const color = 'rgb(213, 50, 16, 0.2)';

  beforeEach(() => {
    (useState as jest.Mock).mockReturnValue([color, setColor]);
  });

  it('should render the picker component but not the color picker itself', async () => {
    const { getByTestId, queryByTestId } = render(
      <ColorPicker defaultColor={color} onChange={setColor} />
    );

    expect(getByTestId('color-picker-square')).toBeInTheDocument();
    expect(queryByTestId('color-picker')).toBeNull;
  });

  it('should render a color picker', async () => {
    const { getByTestId } = render(
      <ColorPicker defaultColor={color} onChange={setColor} />
    );

    const colorPickerSquare = getByTestId('color-picker-square');

    await act(() => {
      fireEvent.click(colorPickerSquare);
    });

    expect(getByTestId('color-picker-square')).toBeInTheDocument();
    expect(getByTestId('color-picker')).toBeInTheDocument();
  });

  it('should render the picked color as text', async () => {
    (useState as jest.Mock).mockReturnValue(['rgb(90, 29, 17, 0.2)', setColor]);

    const { getByTestId, getByText } = render(
      <ColorPicker defaultColor={color} onChange={setColor} />
    );

    expect(getByTestId('color-picker-square')).toBeInTheDocument();
    expect(getByText('rgb(90, 29, 17, 0.2)')).toBeInTheDocument();
  });
});
