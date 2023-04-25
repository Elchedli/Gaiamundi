import { render } from '@testing-library/react';
import { useAccordionContext } from 'components/Accordion/AccordionPanelContext';
import { AccordionContent } from '../AccordionContent';

jest.mock('components/Accordion/AccordionPanelContext');

describe('Accordion Content', () => {
  beforeEach(() => {
    (useAccordionContext as jest.Mock).mockImplementation(() => ({
      isOpen: true,
    }));
  });
  it('renders an open accrordion', () => {
    AccordionContent.displayName = 'Accordion';
    AccordionContent.displayName = 'Accordion.Content';
    const { getByTestId } = render(
      <AccordionContent>
        <div data-testid="Content">Show</div>
      </AccordionContent>
    );
    expect(getByTestId('Content')).toBeVisible();
  });

  it('renders a closed accrordion', () => {
    (useAccordionContext as jest.Mock).mockImplementation(() => ({
      isOpen: false,
    }));
    AccordionContent.displayName = 'Accordion';
    AccordionContent.displayName = 'Accordion.Content';
    const { getByTestId } = render(
      <AccordionContent>
        <div data-testid="Content">Show</div>
      </AccordionContent>
    );
    expect(getByTestId('Content')).not.toBeVisible();
  });
});
