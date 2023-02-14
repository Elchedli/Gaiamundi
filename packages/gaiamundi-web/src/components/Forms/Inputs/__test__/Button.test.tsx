import { fireEvent, render } from '@testing-library/react';
import { Button } from 'components/Button/Button';

describe('Button Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Button label="Button" />);
    expect(container).toBeTruthy();
  });

  it('renders label', () => {
    const label = 'Button Label';
    const { getByText } = render(<Button label={label} />);
    const button = getByText(label);
    expect(button).toBeInTheDocument();
  });

  it('handles click event', () => {
    const label = 'Button Label';
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button label={label} onClick={handleClick} />
    );
    const button = getByText(label);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders color correctly', () => {
    const color = 'blue';
    const { container } = render(<Button label="Button" color={color} />);
    const button = container.firstChild;
    expect(button).toHaveClass(
      `text-white bg-blue-700 border border-transparent`
    );
  });

  it('renders gradient monochrome correctly', () => {
    const gradientMonochrome = 'teal';
    const { container } = render(
      <Button label="Button" gradientMonochrome={gradientMonochrome} />
    );
    const button = container.firstChild;
    expect(button).toHaveClass(`from-teal-400`);
  });

  it('renders gradient duo tone correctly', () => {
    const gradientDuoTone = 'cyanToBlue';
    const { container } = render(
      <Button label="Button" gradientDuoTone={gradientDuoTone} />
    );
    const button = container.firstChild;
    expect(button).toHaveClass(`from-cyan-500`);
  });

  it('renders pill correctly', () => {
    const { container } = render(<Button label="Button" pill />);
    const button = container.firstChild;
    expect(button).toHaveClass(`rounded-full`);
  });
  it('renders size correctly', () => {
    const { container } = render(<Button label="Button" size="lg" />);
    const button = container.firstChild;
    expect(button).toHaveTextContent('Button');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const { container } = render(<Button label="Button" onClick={onClick} />);
    const button = container.firstChild;
    fireEvent.click(button!);

    expect(onClick).toHaveBeenCalled();
  });
});
