import { SiteSettings, SiteAlert } from 'lib/page-props-factory/plugins/site-settings';
import { LinkField } from '@sitecore-content-sdk/nextjs';

// Create a LinkField structure
const createMockLinkField = (
  href: string,
  text: string,
  target: string = '_self',
  linktype: string = 'internal'
): LinkField => ({
  value: {
    text,
    href,
    target,
    linktype,
    anchor: '',
    class: '',
    title: '',
    querystring: '',
    id: '{E9ABAFA1-377C-4577-A419-9A3A8044D435}',
  },
});

// Helper to create alert type structure
const createAlertType = (type: 'Priority' | 'Neutral') => ({
  id:
    type === 'Priority'
      ? '4B21DB0E-B2B4-4A32-9E20-4B185B4D8879'
      : '320706DA-5A21-419E-B292-73158137E446',
  name: type,
  fields: {
    title: {
      value: type,
    },
  },
});

const priorityAlert: SiteAlert = {
  id: 'priority-alert-1',
  alertText: {
    value:
      "We're excited to announce that the enrollment window is now open! - 📅 Enrollment Period: April – May",
  },
  alertCTA: {
    jsonValue: createMockLinkField('/enrollment', 'Learn More'),
  },
  alertType: {
    jsonValue: createAlertType('Priority'),
  },
  startDate: {
    jsonValue: {
      value: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    },
  },
  endDate: {
    jsonValue: {
      value: new Date(Date.now() + 86400000 * 30).toISOString(), // 30 days from now
    },
  },
};

const neutralAlert: SiteAlert = {
  id: 'neutral-alert-1',
  alertText: {
    value: 'Policy update - no dates - neutral',
  },
  alertCTA: {
    jsonValue: createMockLinkField('/policies', 'Blog'),
  },
  alertType: {
    jsonValue: createAlertType('Neutral'),
  },
  startDate: {
    jsonValue: {
      value: '0001-01-01T00:00:00Z', // No date restriction
    },
  },
  endDate: {
    jsonValue: {
      value: '0001-01-01T00:00:00Z', // No date restriction
    },
  },
};

const priorityAlert2: SiteAlert = {
  id: 'priority-alert-2',
  alertText: {
    value: 'New alert test - no date - neutral',
  },
  alertCTA: {
    jsonValue: createMockLinkField('/news', 'Read More'),
  },
  alertType: {
    jsonValue: createAlertType('Priority'),
  },
  startDate: {
    jsonValue: {
      value: '0001-01-01T00:00:00Z',
    },
  },
  endDate: {
    jsonValue: {
      value: '0001-01-01T00:00:00Z',
    },
  },
};

export const mockSiteSettings: SiteSettings = {
  gtmId: null,
  favicon: null,
  socialShareLinks: null,
  siteAlerts: [priorityAlert, neutralAlert, priorityAlert2],
};

export const priorityAlertSettings: SiteSettings = {
  gtmId: null,
  favicon: null,
  socialShareLinks: null,
  siteAlerts: [priorityAlert],
};

export const neutralAlertSettings: SiteSettings = {
  gtmId: null,
  favicon: null,
  socialShareLinks: null,
  siteAlerts: [neutralAlert],
};

export const multipleAlertsSettings: SiteSettings = {
  gtmId: null,
  favicon: null,
  socialShareLinks: null,
  siteAlerts: [priorityAlert, neutralAlert, priorityAlert2],
};
