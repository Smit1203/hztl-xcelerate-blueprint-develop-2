/* eslint-disable  @typescript-eslint/no-explicit-any */
import React from 'react';
import { render, act } from '@testing-library/react';
import { Default as JumpNavContainer } from 'components/authorable/shared/layout/JumpNavContainer';
import defaultData from './JumpNavContainer.mock-data';
import { PlaceholderWrapperProps } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';

// Mock the useDictionary hook
jest.mock('lib/hooks/useDictionary', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    getDictionaryValue: (key: string) => key,
  }),
}));

// Mock the PlaceholderWrapper component
jest.mock('helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper', () => ({
  PlaceholderWrapper: ({ name, rendering }: PlaceholderWrapperProps) => {
    const components = rendering?.placeholders?.[name] || [];
    return React.createElement(
      'div',
      { 'data-testid': `placeholder-${name}` },
      components.map((comp: any) =>
        React.createElement('div', {
          key: comp.uid,
          'data-testid': `component-${comp.componentName}`,
        })
      )
    );
  },
}));

// Mock router
jest.mock('next/router');

// Mock SvgIcon to avoid LoadableComponent issues
jest.mock('helpers/SvgIcon', () => ({
  SvgIcon: () => null,
}));

describe('<jumpnavcontainer />', () => {
  it('should match snapshot', async () => {
    let container;
    await act(async () => {
      const result = render(<JumpNavContainer {...defaultData} />);
      container = result.container;
    });
    expect(container).toMatchSnapshot();
  });

  it('should render the jumpnavcontainer', async () => {
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<JumpNavContainer {...defaultData} />);
      container = renderResult.container;
    });

    const sectionComponent = container.querySelector(
      '[data-component="authorable/shared/layout/jump-nav-container"]'
    );
    expect(sectionComponent).toBeInTheDocument();
  });
});
