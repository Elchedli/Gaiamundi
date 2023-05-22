import { render } from '@testing-library/react';
import { Accordion } from '../index';

describe('Accordion ', () => {
  it('renders accrordion', () => {
    const { getByTestId } = render(
      <Accordion>
        <Accordion.Panel key={1}>
          <Accordion.Title>
            <h3 className="text-md font-medium text-gray-900 title-font">
              {1}
            </h3>
          </Accordion.Title>
          <Accordion.Content>
            <div data-testid="accordion" />
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    );

    expect(getByTestId('accordion')).toBeInTheDocument();
  });
});
