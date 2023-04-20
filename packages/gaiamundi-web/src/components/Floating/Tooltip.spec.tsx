import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedResizeObserver } from 'utils/mocks/resize-observer';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

const arrows = () => screen.getAllByTestId('tooltip-arrow');

const targets = () => screen.getAllByTestId('tooltip-target');

const tooltips = () => screen.getAllByTestId('tooltip');

describe('Tooltip', () => {
  window.ResizeObserver = MockedResizeObserver;

  describe('Keyboard interactions', () => {
    it('should display when target is focused with `Tab`', async () => {
      render(<TooltipTests />);

      await userEvent.tab();

      const tooltip = tooltips()[0];

      expect(tooltip).not.toHaveClass('invisible');
    });

    it('should display when `Space` is pressed while target is focused', async () => {
      render(<TooltipTests />);

      const target = targets()[1];
      const tooltip = tooltips()[1];

      await userEvent.click(target);

      expect(tooltip).not.toHaveClass('invisible');
    });
  });

  describe('Rendering', () => {
    it('should invert placement so it stays on screen if it would normally be placed off screen', async () => {
      render(<TooltipTests />);

      let tooltip = tooltips()[2];
      let arrow = arrows()[2];

      userEvent.click(tooltip);

      expect(arrow).toHaveStyle('top: -4px');

      tooltip = tooltips()[3];
      arrow = arrows()[3];

      userEvent.click(tooltip);

      expect(arrow).toHaveStyle('left: -4px');
    });
  });
});

const TooltipTests = (): JSX.Element => {
  return (
    <div>
      <Tooltip content="Tooltip content">
        <Button>Default tooltip</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" trigger="click">
        <Button>Click tooltip</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" placement="bottom" trigger="click">
        <Button>Bottom placed tooltip</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" placement="right" trigger="click">
        <Button>Right placed tooltip</Button>
      </Tooltip>
      <Tooltip content="Tooltip content" placement="auto" trigger="click">
        <Button>Auto placed tooltip</Button>
      </Tooltip>
    </div>
  );
};
