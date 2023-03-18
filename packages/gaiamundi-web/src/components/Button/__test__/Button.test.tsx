import { fireEvent, render } from '@testing-library/react';

import { Button } from 'components/Button/Button';

describe('Button Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Button label="Button" />);
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('renders label', () => {
    const label = 'Button Label';
    const { container, getByText } = render(<Button label={label} />);
    const button = getByText(label);
    expect(button).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('handles click event', () => {
    const label = 'Button Label';
    const handleClick = jest.fn();
    const { container, getByText } = render(
      <Button label={label} onClick={handleClick} />
    );
    const button = getByText(label);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  it('renders color correctly', () => {
    const color = 'blue';
    const { container } = render(<Button label="Button" color={color} />);
    const button = container.firstChild;
    expect(button).toHaveClass(
      `text-white bg-blue-700 border border-transparent`
    );
    expect(container).toMatchSnapshot();
  });

  it('renders gradient monochrome correctly', () => {
    const gradientMonochrome = 'teal';
    const { container } = render(
      <Button label="Button" gradientMonochrome={gradientMonochrome} />
    );
    const button = container.firstChild;
    expect(button).toHaveClass(`from-teal-400`);
    expect(container).toMatchSnapshot();
  });

  it('renders gradient duo tone correctly', () => {
    const gradientDuoTone = 'cyanToBlue';
    const { container } = render(
      <Button label="Button" gradientDuoTone={gradientDuoTone} />
    );
    const button = container.firstChild;
    expect(button).toHaveClass(`from-cyan-500`);
    expect(container).toMatchSnapshot();
  });

  it('renders pill correctly', () => {
    const { container } = render(<Button label="Button" pill />);
    const button = container.firstChild;
    expect(button).toHaveClass(`rounded-full`);
    expect(container).toMatchSnapshot();
  });
  it('renders size correctly', () => {
    const { container } = render(<Button label="Button" size="lg" />);
    const button = container.firstChild;
    expect(button).toHaveTextContent('Button');
    expect(container).toMatchSnapshot();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const { container } = render(<Button label="Button" onClick={onClick} />);
    const button = container.firstChild;
    fireEvent.click(button!);
    expect(onClick).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
