import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Components / Card', () => {
  describe('A11y', () => {
    it('should allow `aria-label`', () => {
      render(<Card aria-label="My card" />);

      expect(card()).toHaveAccessibleName('My card');
    });

    it('should provide `<img />` with alternative text given `imgSrc="..."` and `imgAlt="..."`', () => {
      render(
        <Card
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg"
        />
      );
      const img = screen.getByAltText(
        'Meaningful alt text for an image that is not purely decorative'
      );

      expect(img).toBeInTheDocument();
    });
  });

  describe('Rendering', () => {
    it('should render an `<a>` given `href=".."`', () => {
      render(<Card href="#" />);

      expect(screen.getByRole('link')).toEqual(card());
    });

    it('should render an `<img>` given `imgSrc=".."`', () => {
      render(
        <Card imgSrc="https://flowbite.com/docs/images/blog/image-1.jpg" />
      );
      const img = screen.getByRole('img');

      expect(card()).toContainElement(img);
    });
  });
});

const card = () => screen.getByTestId('flowbite-card');
