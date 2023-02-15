import { render } from '@testing-library/react';
import { Button } from 'components/Button/Button';
import ButtonGroup from 'components/Button/ButtonGroup';
describe('ButtonGroup', () => {
  it('renders correct classes', () => {
    const { getByRole } = render(<ButtonGroup />);
    const buttonGroup = getByRole('group');
    expect(buttonGroup).toHaveClass('inline-flex');
  });

  it('should render children', () => {
    const { getByText } = render(
      <ButtonGroup>
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );
    expect(getByText('Button 1')).toBeInTheDocument();
    expect(getByText('Button 2')).toBeInTheDocument();
  });

  it('should add the "pill | outline" class if the "pill | outline" prop is true', () => {
    const { container } = render(
      <ButtonGroup pill outline>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>
    );
    expect(container.querySelector('span')).toHaveClass('rounded-full');
  });

  it('should add the custom class if added with otherProps', () => {
    const { container } = render(
      <ButtonGroup className="testClass">
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>
    );

    expect(container.firstChild).toHaveClass('testClass');
  });
});
