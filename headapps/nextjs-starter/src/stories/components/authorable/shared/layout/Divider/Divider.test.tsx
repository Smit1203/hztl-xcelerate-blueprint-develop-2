import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { Default as Divider } from 'components/authorable/shared/layout/Divider';
import defaultData from './Divider.mock-data';

// Mock router
jest.mock('next/router');

describe('<divider />', () => {
  it('should match snapshot', () => {
    const { container } = render(<Divider {...defaultData} />);
    expect(container).toMatchSnapshot();
  });

  it('should render divider', async () => {
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<Divider {...defaultData} />);
      container = renderResult.container;
    });

    const dividerComponent = container.querySelector(
      '[data-component="authorable/shared/layout/divider"]'
    );
    expect(dividerComponent).toBeInTheDocument();
  });

  it('should render divider as full width', async () => {
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<Divider {...defaultData} />);
      container = renderResult.container;
    });

    expect(container).toBeInTheDocument();
    const dividerComponent = screen.getByTestId('component-divider-layout');
    expect(dividerComponent).toBeInTheDocument();
  });
});
