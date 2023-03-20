import { render } from '@testing-library/react';
import { Badge } from 'components/Tags/Badge';
describe('Badge', () => {
  it('if we dont have herf, we dont have tage link', () => {
    const { container } = render(<Badge />);
    const link = container.querySelector('a');
    expect(link).not.toBeInTheDocument();
  });
  it('if we have herf, we have tage link', () => {
    const { container } = render(<Badge href="#home" />);
    const link = container.querySelector('a');
    const href = link?.getAttribute('href');

    expect(href).not.toBe(null);
    expect(link).toBeInTheDocument();
  });
});
