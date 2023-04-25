import { render } from '@testing-library/react';
import Well from '../Well';

describe('Well', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Well', () => {
    const { getByTestId } = render(
      <Well title="Potato">
        <div>Child</div>
      </Well>
    );
    expect(getByTestId('well-component')).toBeInTheDocument();
  });
});
