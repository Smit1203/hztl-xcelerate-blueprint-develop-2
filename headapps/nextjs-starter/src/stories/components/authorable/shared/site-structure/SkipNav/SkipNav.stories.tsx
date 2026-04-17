import React from 'react';
import SkipNav from 'components/authorable/shared/site-structure/SkipNav/SkipNav';

const meta = {
  title: 'Components/Authorable/Shared/Site Structure/SkipNav',
  component: SkipNav,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
The Skip Nav component is automatically placed on pages to allow users on assistive technology to jump past the header and skip directly to the main content.

## Usage
To get redirect on main page instead of having multiple clicks on header, skipnav redirects directly on main content and skips the hreader focus.

## User Experience
- When hit tab and reach the skip nav button as the first item on the page.
- When hit enter, it takes directly to the main content section.

`,
      },
    },
  },
};

export default meta;

export const Default = () => (
  <>
    <SkipNav />
    <div>Press tab and see the Skipnav button.</div>
  </>
);

Default.storyName = 'Default';
