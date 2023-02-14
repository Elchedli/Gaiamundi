import { render } from '@testing-library/react';
import { Label } from '../Label';
it('renders color correctly and children classname', () => {
  const color = 'red';
  const { container } = render(<Label color={color} className="text-lg" />);
  const label = container.firstChild;
  expect(label).toHaveClass(`text-red-700`);
  expect(label).toHaveClass(`text-lg`);
});
