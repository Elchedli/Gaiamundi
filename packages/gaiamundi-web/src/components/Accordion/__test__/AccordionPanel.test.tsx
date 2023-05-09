import { render } from '@testing-library/react';
import { AccordionPanel } from '../AccordionPanel';

describe('AccordionPanel', () => {
  it('renders children', () => {
    const child = <div>Child</div>;
    const { getByText } = render(<AccordionPanel>{child}</AccordionPanel>);
    expect(getByText('Child')).toBeInTheDocument();
  });

  it('sets initial state of isOpen', () => {
    const { getByText } = render(
      <AccordionPanel isOpen={true}>
        <div>Child</div>
      </AccordionPanel>
    );
    expect(getByText('Child')).toBeInTheDocument();
  });
});
