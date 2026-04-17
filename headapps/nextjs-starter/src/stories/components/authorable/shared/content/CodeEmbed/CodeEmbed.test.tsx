import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { CodeEmbed } from 'components/authorable/shared/content/CodeEmbed';
import defaultData from './CodeEmbed.mock-data';

// Mock router
jest.mock('next/router');

describe('<CodeEmbed />', () => {
  it('should match snapshot', () => {
    const { container } = render(<CodeEmbed {...defaultData} />);
    expect(container).toMatchSnapshot();
  });

  it('should render code-embed with required sections', async () => {
    let container: HTMLElement = null as unknown as HTMLElement;
    await act(async () => {
      const renderResult = render(<CodeEmbed {...defaultData} />);
      container = renderResult.container;
    });

    const codeEmbedComponent = container.querySelector(
      '[data-component="authorable/shared/content/codeEmbed"]'
    );
    expect(codeEmbedComponent).toBeInTheDocument();
  });

  it('executes html code and render the DOM', () => {
    const customCodeEmbedData = {
      ...defaultData,
      fields: {
        ...defaultData?.fields,
        htmlCode: {
          value: '<div>This is code embed content!</div>',
        },
      },
    };

    render(<CodeEmbed {...customCodeEmbedData} />);
    expect(screen.getByText('This is code embed content!')).toBeInTheDocument();
  });
});
