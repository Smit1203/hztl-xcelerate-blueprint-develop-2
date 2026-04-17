import type { Meta, StoryObj } from '@storybook/react';
import { Default as Alert, AlertProps } from 'components/authorable/shared/content/Alert';
import {
  priorityAlertSettings,
  neutralAlertSettings,
  multipleAlertsSettings,
} from './Alert.mock-data';
import { SiteSettings } from 'lib/page-props-factory/plugins/site-settings';
import { MockProviders } from 'helpers/Mocks/MockProviders';

interface AlertWithContextProps {
  alertProps: AlertProps;
  siteSettings: SiteSettings;
}

// Wrapper component to handle context
const AlertWithContext = ({ alertProps, siteSettings }: AlertWithContextProps) => {
  return (
    <MockProviders siteSettings={siteSettings}>
      <div className="relative w-full">
        <Alert {...alertProps} />
      </div>
    </MockProviders>
  );
};

const meta: Meta<typeof Alert> = {
  title: 'Components/Authorable/Shared/Content/Alert',
  component: Alert,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Alert component is used to display important messages to users. It supports two types of alerts:

- **Priority Alerts**: Used for critical information that requires immediate attention. These alerts have a distinct visual style and are announced to screen readers.
- **Neutral Alerts**: Used for general information or updates. These have a more subtle appearance.

### Features
- Dismissible alerts with cookie-based persistence
- Support for call-to-action links
- Date-based visibility control (start/end dates)
- Responsive design
- Accessible with proper ARIA roles

### Usage
The component can be used in two ways:
1. As a single alert with specific content
2. As a container that displays multiple alerts based on site settings

### Stories
- **Priority Alert**: Shows a single priority alert with a call-to-action link
- **Neutral Alert**: Shows a single neutral alert with a call-to-action link
- **Multiple Alerts**: Demonstrates how multiple alerts of different types can be displayed together
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Priority Alert Story
export const PriorityAlert: Story = {
  args: {
    params: {
      'Alert Type': '{4B21DB0E-B2B4-4A32-9E20-4B185B4D8879}', // Priority GUID
    },
    rendering: {
      componentName: 'Alert',
      uid: 'priority-alert',
    },
  },
  render: (args) => {
    return <AlertWithContext alertProps={args} siteSettings={priorityAlertSettings} />;
  },
  parameters: {
    docs: {
      description: {
        story: `
Priority alerts are used for critical information that requires immediate attention. They have:
- Distinct visual styling to draw attention
- ARIA role="alert" for screen readers
- Optional call-to-action link
- Optional start/end dates for time-based display
        `,
      },
    },
  },
};

// Neutral Alert Story
export const NeutralAlert: Story = {
  args: {
    params: {
      'Alert Type': '{320706DA-5A21-419E-B292-73158137E446}', // Neutral GUID
    },
    rendering: {
      componentName: 'Alert',
      uid: 'neutral-alert',
    },
  },
  render: (args) => {
    return <AlertWithContext alertProps={args} siteSettings={neutralAlertSettings} />;
  },
  parameters: {
    docs: {
      description: {
        story: `
Neutral alerts are used for general information or updates. They have:
- Subtle visual styling
- ARIA role="region" for screen readers
- Optional call-to-action link
- No time-based display restrictions
        `,
      },
    },
  },
};

// Multiple Alerts
export const MultipleAlerts: Story = {
  args: {
    params: {
      'Alert Type': '{4B21DB0E-B2B4-4A32-9E20-4B185B4D8879}', // Priority GUID
    },
    rendering: {
      componentName: 'Alert',
      uid: 'multiple-alerts',
    },
  },
  render: (args) => {
    return <AlertWithContext alertProps={args} siteSettings={multipleAlertsSettings} />;
  },
  parameters: {
    docs: {
      description: {
        story: `
The Multiple Alerts story demonstrates how the component can display multiple alerts simultaneously:
- Shows both priority and neutral alerts
- Each alert can be dismissed independently
- Alerts are stacked vertically
- Maintains proper spacing and visual hierarchy
        `,
      },
    },
  },
};
