// Global
import type { Meta, StoryObj } from '@storybook/react';

// Local
import Default, { CodeEmbedProps } from 'components/authorable/shared/content/CodeEmbed';
import { expandObj, flattenObj } from 'lib/object-parser';
import { useEffect } from 'react';
import defaultData from 'stories/components/authorable/shared/content/CodeEmbed/CodeEmbed.mock-data';

/* eslint-disable  @typescript-eslint/no-explicit-any */
const meta: Meta<typeof Default> = {
  component: Default,
  title: 'Components/Authorable/Shared/Content/CodeEmbed',
  decorators: [
    (Story, context) => {
      const args = expandObj(context.args) as CodeEmbedProps;
      const scriptContent = args?.fields?.script?.value;

      // For live update the script from storybook controls
      useEffect(() => {
        if (!scriptContent) return;

        // Remove previous script
        const oldScript = document.getElementById('storybook-live-script');
        if (oldScript) oldScript.remove();

        // Inject new script safely
        const script = document.createElement('script');
        script.id = 'storybook-live-script';
        script.type = 'text/javascript';
        script.textContent = `(function() {
          ${scriptContent}
        })();`;

        document.body.appendChild(script);
      }, [scriptContent]);

      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        component: `
## CodeEmbed Component
  
  The **CodeEmbed** component enables secure embedding of custom HTML or third-party JavaScript on a page, while ensuring CSP (Content Security Policy) compliance and avoiding 'inline' script execution.
  
### Key Features
  
  - **Secure Embedding**: Prevents inline \`<script>\` tags by default. Optionally allows inline \`<style>\` tags if approved by the client.
  - **Script Source URL**: Supports full URLs to external JS files. Injected as \`<script>\` tags when provided.
  - **Script ID**: Unique identifier required when using Script Source URL or Script content.
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Default>;

export const CodeEmbed: Story = {
  args: {
    ...flattenObj(defaultData as any),
  },
  name: 'Default',
  render: (args) => {
    return <Default {...(expandObj({ ...args }) as CodeEmbedProps)} />;
  },
};
