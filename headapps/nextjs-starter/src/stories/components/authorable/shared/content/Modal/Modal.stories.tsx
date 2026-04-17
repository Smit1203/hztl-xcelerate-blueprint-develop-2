// Global
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Lib
import { expandObj, flattenObj } from 'lib/object-parser';

// Local
import { Default, ModalProps } from 'components/authorable/shared/content/Modal';
import ButtonWrapper from 'helpers/SitecoreWrappers/ButtonWrapper/ButtonWrapper';
import defaultData from 'stories/components/authorable/shared/content/Modal/Modal.mock-data';

const meta: Meta<typeof Default> = {
  argTypes: {
    'fields.id.value': {
      description: 'The unique identifier for the modal.',
      table: {
        category: 'fields',
      },
    },
    'fields.label.value': {
      description: 'The `aria-label` of the modal.',
      table: {
        category: 'fields',
      },
    },
    'fields.name.value': {
      description: 'A unique identifire for the modal.',
      table: {
        category: 'fields',
      },
    },
    'fields.openOnLoad.value': {
      control: 'boolean',
      defaultValue: false,
      description: 'A flag that determines if the modal should be opened on page load.',
      table: {
        category: 'fields',
      },
    },
    'fields.size.value': {
      control: 'select',
      defaultValue: 'large',
      description: 'The size variant of the modal.',
      options: ['extra-large', 'large', 'medium', 'small', 'fluid'],
      table: {
        category: 'fields',
      },
    },
    'fields.title.value': {
      control: 'select',
      description: 'A `ReactNode` representing the title of the modal.',
      mapping: {
        Title: 'Modal Title',
        'Title with Markup': (
          <>
            Modal Title with HTML Markup<sup>®</sup>
          </>
        ),
      },
      options: ['Title', 'Title with Markup'],
      table: {
        category: 'fields',
      },
    },
    'fields.trigger.value': {
      control: 'select',
      description: "A `ReactNode` representing the content of the modal's trigger.",
      mapping: {
        Anchor: <a>A text link that opens a modal.</a>,
        Button: (
          <ButtonWrapper
            ctaComponentClass="default"
            ctaVariant="primary"
            id="modal-2845070A-AEBD-4B45-A59D-88269B081204-button"
            text="Modal Trigger"
            title="Modal Trigger"
            type="button"
          />
        ),
      },
      options: ['Anchor', 'Button'],
      table: {
        category: 'fields',
      },
    },
    'params.DynamicPlaceholderId': {
      table: {
        category: 'params',
      },
    },
    'rendering.componentName': {
      table: {
        category: 'rendering',
      },
    },
    'rendering.dataSource': {
      table: {
        category: 'rendering',
      },
    },
    'rendering.placeholders.modal-1': {
      table: {
        category: 'rendering',
      },
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } as any,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The modal component uses a JSS Placeholder to define its content, and listens for changes to the URL hash and a specific hash value to trigger the modal to open. Use the Modal component when you need to present content in a way that grabs the user's focus and covers other page content.

## Demo
Click the button below to test the modal functionality. The modal can be triggered by setting the URL hash to match the modal ID.

## Usage
From within the Pages editor, a new modal can be created by taking the following steps:

1. Add a new Modal component to a page.
1. Optionally enter text for the modal title.
1. Add a content component to the modal body to populate the modal with content.
1. Enter text for the modal name to create a unique URL hash for this modal instance.<br />Example: <code>&nbsp;#modal-demo</code>
1. Add a triggering element somewhere else on the page containing the modal.<br />Example: <code>&lt;LinkWrapper field={{ value: { anchor: '#modal-demo', linktype: 'internal', text: 'Remote Trigger' } }}/&gt;</code>
`,
      },
      // Disable automatic component rendering to prevent duplicates
      source: {
        state: 'closed',
      },
    },
    controls: { sort: 'requiredFirst' },
  },
  title: 'Components/Authorable/Shared/Content/Modal',
};

export default meta;

type Story = StoryObj<typeof Default>;

// Default modal component for testing
const DefaultModalComponent = ({ args }: { args: any }) => {
  const [currentHash, setCurrentHash] = React.useState(
    typeof window !== 'undefined' ? window.location.hash : 'N/A'
  );
  const isTriggering = React.useRef(false);

  const expandedArgs = expandObj({ ...args }) as any;
  const modalId = expandedArgs?.fields?.modalId?.value || 'defaultmodal';

  React.useEffect(() => {
    const updateHash = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, []);

  const setHash = () => {
    if (typeof window !== 'undefined' && !isTriggering.current) {
      isTriggering.current = true;

      // Clear any existing hash first
      window.location.hash = '';

      // Set the new hash after a brief delay to ensure proper triggering
      setTimeout(() => {
        window.location.hash = `#modal-${modalId}`;
        // Reset the flag after a delay to allow for proper modal opening
        setTimeout(() => {
          isTriggering.current = false;
        }, 100);
      }, 50);
    }
  };

  return (
    <>
      <div style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
        <button
          onClick={setHash}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Open Modal
        </button>
        <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Current Hash: <code>{currentHash}</code>
        </p>
      </div>
      <Default {...(expandObj({ ...args }) as ModalProps)} />
    </>
  );
};

// Default story - main story for testing
export const Modal: Story = {
  args: {
    ...flattenObj(defaultData),
  },
  name: 'Default',
  render: (args) => <DefaultModalComponent args={args} />,
};
